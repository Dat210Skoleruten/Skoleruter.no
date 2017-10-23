
const http = require("http");
const https = require("https");
fs = require('fs');
var path = require('path')
//const papa = require("papaparse.min.js");
//const fs = require("fs");
const hostname = "127.0.0.1";
const port = 443;
var InfiniteLoop = require('infinite-loop');
var express = require('express')
var app = express()

const kommuneArrays = [];
const kommuneDataPaths = [];
kommuneDataPaths["stavanger"] = ["skolerute_stavanger.csv", "skoler_stavanger.csv"];
kommuneDataPaths["gjesdal"] = ["skolerute_gjesdal.csv", "skoler_gjesdal.csv"]; //gjesdal is fine when only kommuneDataPaths["gjesdal"] is in the array (not "stavanger" etc.)

process.stdout.write('\033c'); //Clear cmd window. ONLY FOR DEBUGGING

console.time("init");
checkLocalData();
console.timeEnd("init");
setTimeout(loopCheck, 30 * 1000);

function loopCheck() {
    checkLocalData();
    setTimeout(loopCheck, 50 * 1000);
}

// Check all csv files
function checkLocalData() {
    var options = {
        host: 'https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/a6615196-b8ab-4e60-8236-3da776a2c595/download/skolerute-2017-18.csv',
        port: 443
    };

    for (var i in kommuneDataPaths) {
        getKommuneData(i);
    }
}

function setKommuneArray(name) {
    var kommuneArray = getLocalData_Array(name, function (dataArray) {
        console.log("setKommuneArray(" + name + ")");
        kommuneArrays[name] = dataArray;
        setLocalData_CSV(name, dataArray);
        setLocalData_JSON(name, kommuneArray);
        return dataArray;
    });
}

function getKommuneData(name) {
    if (kommuneArrays[name] != null) {
        console.log("Returning existing array for " + name);
        return kommuneArrays[name];
    } else {
        return setKommuneArray(name);
    }
}

function setLocalData_JSON(name, array) {
    var JSONstr = JSON.stringify(array);

    fs.writeFile('JSON/' + name + ".JSON", JSONstr, (err) => {
        if (err) throw err;
        console.log(name + ' JSON file saved!');
    });
}

function setLocalData_CSV(name, array) {
    str = "Skolenavn,Latitude,Longitude,Hjemmeside,Datoer";
    for (i in array) {
        str += "\n";
        for (elem in array[i]) {
            if (array[i][elem] == undefined) {
                str = str.substring(0, str.length - 1);
                break;
            }

            if (elem == "Datoer") {
                str += formatDatoerForCSV(array[i][elem]);
            } else {
                str += array[i][elem] + ",";
            }
        }
    }

    fs.writeFile('CSV/' + name + ".csv", str, (err) => {
        if (err) throw err;
        console.log(name + ' csv file saved!');
    });
}

function formatDatoerForCSV(array) {
    str = "";

    for (date in array) {
        if (date != "undefined") {
            str += "[" + date + ";" + array[date][0] + ";" + array[date][1] + "]";
        }
    }
    return str;
}

function formatDatoerFromCSV(str) {
    arr = []
    var lines = str.split("\[(.*?)\]");

    for (var i in lines) {
        var parts = lines[i].split(";");
        arr[parts[0]] = [parts[1], parts[2]];
    }
    return arr;
}

function mergeJSON(name) {
    var ruteData, skoleData;

    fs.readFile("JSON/" + name + "_rute" + ".JSON", 'utf8', function (err, ruteJSON) {
        ruteData = JSON.stringify(ruteJSON);
        fs.readFile("JSON/" + name + "_skole" + ".JSON", 'utf8', function (err, skoleJSON) {
            skoleData = JSON.stringify(skoleJSON);
            return mergeData(ruteData, skoleData);
        });
    });
}

function mergeData(parsedRute, parsedSkole) {
    var mergedData = {};

    for (var i = 0; i < Object.keys(parsedSkole).length; i++) { // filling array with data from parsedSkole
        //console.log(parsedSkole[i].Skolenavn, parsedSkole[i].Latitude, parsedSkole[i].Longitude, parsedSkole[i].Hjemmeside);
        mergedData[i] = {
            Skolenavn: parsedSkole[i].Skolenavn != null ? parsedSkole[i].Skolenavn : parsedSkole[i].skolenavn,
            Latitude: parsedSkole[i].Latitude != null ? parsedSkole[i].Latitude : parsedSkole[i].latitude,
            Longitude: parsedSkole[i].Longitude != null ? parsedSkole[i].Longitude : parsedSkole[i].longitude,
            Hjemmeside: parsedSkole[i].Hjemmeside != null ? parsedSkole[i].Hjemmeside : parsedSkole[i].hjemmeside,
            Datoer: {}
        }
    }

    for (var i = 0; i < Object.keys(parsedRute).length; i++) { // adding date array to schools
        var found = false;

        for (var j = 0; j < Object.keys(mergedData).length; j++) {
            if (parsedRute[i].skole == null || mergedData[j].Skolenavn == null) { }
            else if (parsedRute[i].skole == mergedData[j].Skolenavn || parsedRute[i].Skole == mergedData[j].Skolenavn) {
                found = true;
                mergedData[j].Datoer[parsedRute[i].dato] = formatDato(parsedRute[i]);
                for (var element in parsedRute[i]) {
                    if (!isNaN(Date.parse(parsedRute[i][element])) && parsedRute[i][element].substring(0, 2) == "20" && element != null) {
                        mergedData[j].Datoer[parsedRute[i][element]] = formatDato(parsedRute[i]);
                    }
                }
            }
        }
    }
    return mergedData;
}

function getLocalData_Array(name, callback) {
    fs.exists("JSON/" + name + ".JSON", function (exists) { // <<<<=========== NAME IS TMP. REMOVE TO MAKE THIS WORK!!! 
        if (exists) {
            fs.readFile("JSON/" + name + ".JSON", 'utf8', function (err, dataFromJSON) {
                callback(JSON.parse(dataFromJSON));
            });
        } else {
            parsedRute = {};
            parsedSkole = {};
            fs.readFile(kommuneDataPaths[name][0], 'utf8', function (err, ruteData) {
                if (err) {
                    //download from net 
                }
                console.log(kommuneDataPaths[name][0], name);
                var lines = ruteData.split("\r");

                for (var i = 1; i < lines.length; i++) {
                    var items = lines[i].split(',');
                    items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                    var day = {};

                    if (name == "gjesdal") {
                        day.dato = items[0];
                        day.skole = items[1];
                        day.elevdag = items[2];
                        day.sfodag = items[3];
                        day.kommentar = items[4];
                    } else if (name == "stavanger") {
                        day.dato = items[0];
                        day.skole = items[1];
                        day.elevdag = items[2];
                        day.sfodag = items[4];
                        day.kommentar = items[5];
                    }

                    if (day.skole != undefined || day.skole != null) {
                        parsedRute[i - 1] = day;
                    }
                }

                fs.readFile(kommuneDataPaths[name][1], 'utf8', function (err, skoleData) {
                    if (err) {
                        return console.log(err);
                        //download from net
                    }

                    lines = skoleData.split("\r");

                    for (var i = 1; i < lines.length; i++) {
                        var items = lines[i].split(',');
                        items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                        var school = {};

                        if (name == "gjesdal") {
                            school.Longitude = items[2];
                            school.Latitude = items[3];
                            school.Skolenavn = items[4];
                            school.Hjemmeside = items[7];
                            school.Datoer = [];
                        } else if (name == "stavanger") {
                            school.Longitude = items[3];
                            school.Latitude = items[2];
                            school.Skolenavn = items[9];
                            school.Hjemmeside = items[11];
                            school.Datoer = [];
                        }

                        if (school.Skolenavn != undefined || school.Skolenavn != null) {
                            parsedSkole[i - 1] = school;
                        }

                    }

                    var mergedRute = mergeData(parsedRute, parsedSkole);
                    setLocalData_JSON(name, mergedRute);
                    callback(mergedRute);
                });
            });
        }
    });
}

function parseRute(skoleRuteCSV) {
    console.log(skoleRuteCSV);
}

function download(url, dest, cb) { // download CSV from open data
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on("finish", function () {
            file.close(cb);
        });
    }).on("error", function (err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
}

function formatDato(entry) {
    var dayType = "";

    if (!entry || !(entry.elevdag) || !(entry.sfodag)) { // hvis undefined (gjesdal har defekt data)
        return ["111", ""];
    }

    if (entry.elevdag && entry.elevdag.toLowerCase() == "ja") {
        dayType += "1";
    } else if (entry.Elevdag && entry.Elevdag.toLowerCase() == "ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    dayType += "1"; // lærerdag (obsolete)

    if (entry.sfodag && entry.sfodag.toLowerCase() == "ja") {
        dayType += "1";
    } else if (entry.Sfodag && entry.Sfodag.toLowerCase() == "ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }
    return [dayType, entry.kommentar];
};

function printMergedArray(paths) {
    var arr = getOpenData_Array(paths);
}

app.use(express.static('Website'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/json', express.static('JSON'))

function setGet(name) {
    app.get('/' + name, function (req, res) {
        res.send(kommuneArrays[name]);
    })
}

app.get('/', function (req, res) {
    res.sendFile('Website/index.html', { root: __dirname });
})

/*
fs.readFile("index.html", (err, html) => {
    if(err){
        throw err;
    }
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");
        res.write(html);
        res.end();
    });

    server.listen(port, hostname, () => {
        console.log("Server started on port " + port);
    });
});
*/

/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.write(getOpenData_Array(kommuneDataPaths["stavanger"]));
    res.end();
});

server.listen(port, hostname, () => {
    console.log("Server started on port " + port);
});
*/

/*
function getLocalData_Array(name, callback) {
    fs.exists("JSON/" + name + "_ruteTMP" + ".JSON", function (exists) { // <<<<=========== NAME IS TMP. REMOVE TO MAKE THIS WORK!!! 
        if (exists) {
            var dataFromJSON = mergeJSON(name);
            //console.log(dataFromJSON);
            callback(dataFromJSON);
        } else {
            parsedRute = [];
            parsedSkole = [];
            console.time("jalla parsing");
            fs.readFile(kommuneDataPaths[name][0], 'utf8', function (err, ruteData) {
                if (err) {
                    //download from net 
                }
                var lines = ruteData.split("\r");
                //console.log(lines);
                for (var i = 1; i < lines.length; i++) {
                    var items = lines[i].split(',');
                    items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                    var day = [];
                    day.dato = items[0];
                    day.skole = items[1];
                    day.elevdag = items[2];
                    day.sfodag = items[3];
                    day.kommentar = items[4];
                    parsedRute[i - 1] = day;
                }
                //console.log(parsedRute);

                fs.readFile(kommuneDataPaths[name][1], 'utf8', function (err, skoleData) {
                    if (err) {
                        return console.log(err);
                        //download from net
                    }
                    lines = skoleData.split("\r");
                    for (var i = 1; i < lines.length; i++) {
                        var items = lines[i].split(',');
                        items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                        if (i == 1) {
                        }
                        var school = [];
                        school.Longitude = items[2];
                        school.Latitude = items[3];
                        school.Skolenavn = items[4];
                        school.Hjemmeside = items[7];
                        school.Datoer = [];
                        parsedSkole[i - 1] = school;
                    }
                    //console.log(parsedRute);
                    var mergedRute = mergeData(parsedRute, parsedSkole);
                    setLocalData_JSON(name + "_rute", parsedRute);
                    setLocalData_JSON(name + "_skole", parsedSkole);
                    console.timeEnd("jalla parsing");
                    callback(mergedRute);
                });
            });
        }
    });
}
*/

/*function getLocalData_Array(name, callback) {
    fs.exists("JSON/" + name + "_ruteTMP" + ".JSON", function (exists) { // <<<<=========== NAME IS TMP. REMOVE TO MAKE THIS WORK!!! 
        if (exists) {
            var dataFromJSON = mergeJSON(name);
            //console.log(dataFromJSON);
            callback(dataFromJSON);
        } else {
            parsedRute = [];
            parsedSkole = [];
            console.time("jalla parsing");
            fs.readFile(kommuneDataPaths[name][0], 'utf8', function (err, ruteData) {
                if (err) {
                    //download from net 
                }
                var lines = ruteData.split("\r");
                //console.log(lines);
                for (var i = 1; i < lines.length; i++) {
                    var items = lines[i].split(',');
                    items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                    var day = [];
                    day.dato = items[0];
                    day.skole = items[1];
                    day.elevdag = items[2];
                    day.sfodag = items[3];
                    day.kommentar = items[4];
                    parsedRute[i - 1] = day;
                }
                //console.log(parsedRute);
                parsedSkoleStr = "[";
                fs.readFile(kommuneDataPaths[name][1], 'utf8', function (err, skoleData) {
                    if (err) {
                        return console.log(err);
                        //download from net
                    }
                    lines = skoleData.split("\r");
                    for (var i = 1; i < lines.length; i++) {
                        var items = lines[i].split(',');
                        items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                        parsedSkoleStr += "{ 'Skolenavn':" + items[4] +
                            ", 'Latitude':" + items[3] +
                            ", 'Longitude':" + items[2] +
                            ", 'Hjemmeside':" + items[7] +
                            ", 'Datoer':[]},";
                    }
                    parsedSkoleStr = parsedSkoleStr.substring(0, parsedSkoleStr.length - 1) + "]";
                    console.log(parsedSkoleStr);
                    //console.log(parsedRute);
                    var mergedRute = mergeData(parsedRute, parsedSkole);
                    setLocalData_JSON(name + "_rute", parsedRute);
                    setLocalData_JSON(name + "_skole", parsedSkole);
                    console.timeEnd("jalla parsing");
                    callback(mergedRute);
                });
            });
        }
    });
}
*/
