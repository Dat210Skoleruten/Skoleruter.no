
const http = require("http");
const https = require("https");
fs = require('fs');
//const papa = require("papaparse.min.js");
//const fs = require("fs");
const hostname = "127.0.0.1";
const port = 443;
var InfiniteLoop = require('infinite-loop');
var express = require('express')
var app = express()

const kommuneArrays = [];
const kommuneDataPaths = [];
kommuneDataPaths["stavanger"] = ["skolerute_stavanger.csv", 
    "skoler_stavanger.csv"];
kommuneDataPaths["gjesdal"] = ["skolerute_gjesdal.csv", //gjesdal is fine when only kommuneDataPaths["gjesdal"] is in the array (not "stavanger" etc.)
    "skoler_gjesdal.csv"];
    /*
    kommuneDataPaths["stavanger"] = ["https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/0f5046ee-6d37-433f-b149-6d313b087864/download/skolerute.csv",
    "https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/8d13aca1-a3b3-49d5-8728-8dc310ef9f4a/download/skoler.csv"];
kommuneDataPaths["baerum"] = ["https://open.stavanger.kommune.no/dataset/6837c1de-6dce-48a3-a8a6-e59630912779/resource/19f6c237-bc56-4c1d-bb59-4538a3215eba/download/skolerute-2016-17.csv",
    "https://open.stavanger.kommune.no/dataset/4a5f420f-453d-4e23-85f5-0b1d5d4a1fe0/resource/95bc274b-04bc-4a45-82ce-3d22ef46225d/download/skoler-i-baerum.csv"];*/
//kommuneDataPaths["trondheim"] = ["skolerute_trondheim.csv",
//                                "skoler_trondheim.csv"]; //["https://open.stavanger.kommune.no/dataset/7f6df84e-409c-4509-ba95-23a13d0a6730/resource/f9f73bc7-49ce-442d-92c2-3aa03c577451/download/skoleruta-2016-2017-trondheim-kommune.csv", 
//"https://open.stavanger.kommune.no/dataset/055880c9-cb7e-4919-ab9f-e6d6ee096346/resource/70148039-78b7-43e5-b1d1-ee779971f65b/download/skolertrondheim.csv"];

process.stdout.write('\033c'); //Clear cmd window. ONLY FOR DEBUGGING

console.time("init");
checkLocalData();
console.timeEnd("init");
setTimeout(loopCheck, 30*1000);


function loopCheck(){
    console.log("looping in loopCheck");
    checkLocalData();
    setTimeout(loopCheck, 10*1000);
}

function checkLocalData() { //check all csv files
    console.log("running checkLocalData");
    var options = {
        host: 'https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/0f5046ee-6d37-433f-b149-6d313b087864/download/skolerute.csv',
        port: 443
    };
    /*
    http.get(options, function (res) {
        console.log("Got response: " + res.statusCode);

        res.on("data", function (chunk) {
            console.log("BODY: " + chunk);
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
    */
    console.time("checkLocalData");
    for (var currPathName in kommuneDataPaths) {
        /*
        fs.readFile("CSV/" + currPathName + ".csv", (err, file) => {
            if (err) { //if csv not found, make csv
                MakeCSV(currPathName, kommuneDataPaths[currPathName]);
            } else { //else get online data set and compare to local csv
                var openData = getOpenData_CSV(kommuneDataPaths[currPathName]);
                compare(openData, file);
            }
        });
        */
        getKommuneData(currPathName);
    }
    console.timeEnd("checkLocalData");
}


function getKommuneData(name) {
    if (kommuneArrays[name] != null) {
        console.log("returning existing array");
        return kommuneArrays[name];
    } else {
        return setKommuneArray(name);
    }
}

function setKommuneArray(name) {
    var kommuneArray = getLocalData_Array(name, function (dataArray) {
        kommuneArrays[name] = dataArray;
        setLocalData_CSV(name, dataArray);
        //setLocalData_JSON(name, kommuneArray);
        return dataArray;
    });
}

function setLocalData_JSON(name, array) {
    //console.log(array);
    console.time("stringify");
    var JSONstr = JSON.stringify(array);
    //console.log(JSONstr);
    fs.writeFile('JSON/' + name + ".JSON", JSONstr, (err) => {
        if (err) throw err;
        console.log(name + ' JSON file saved!');

    });
    console.timeEnd("stringify");
}

function setLocalData_CSV(name, array) {

    str = "Skolenavn,Latitude,Longitude,Hjemmeside,Datoer";
    for (idx in array) {
        //console.log(array[idx]);
        str += "\n";
        for (elem in array[idx]) {
            if (array[idx][elem] == undefined) {
                str = str.substring(0, str.length - 1);
                break;
            }
            if (elem == "Datoer") str += formatDatoerForCSV(array[idx][elem]);
            else str += array[idx][elem] + ",";
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
    //console.log(parsedRute, mergedData);
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
                //console.log(lines);
                for (var i = 1; i < lines.length; i++) {
                    var items = lines[i].split(',');
                    items[0] = items[0].replace("\n", ""); //fixing error in data collecting
                    var day = {};
                    if(name == "gjesdal"){
                        day.dato = items[0];
                        day.skole = items[1];
                        day.elevdag = items[2];
                        day.sfodag = items[3];
                        day.kommentar = items[4];
                    }else if(name == "stavanger"){
                        day.dato = items[0];
                        day.skole = items[1];
                        day.elevdag = items[2];
                        day.sfodag = items[4];
                        day.kommentar = items[5];
                    }
                    if(day.skole != undefined || day.skole != null){
                        parsedRute[i - 1] = day;
                    }
                    
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
                        var school = {};

                        if(name == "gjesdal"){
                            school.Longitude = items[2];
                            school.Latitude = items[3];
                            school.Skolenavn = items[4];
                            school.Hjemmeside = items[7];
                            school.Datoer = [];
                        }else if(name == "stavanger"){
                            school.Longitude = items[3];
                            school.Latitude = items[2];
                            school.Skolenavn = items[9];
                            school.Hjemmeside = items[11];
                            school.Datoer = [];
                        }
                        if(school.Skolenavn != undefined || school.Skolenavn != null){
                            parsedSkole[i - 1] = school;
                        }
                        
                    }
                    console.log(name);
                    console.log(parsedRute[0]);
                    console.log(name);
                    var mergedRute = mergeData(parsedRute, parsedSkole);
                    //console.log("test", mergedRute);
                    setLocalData_JSON(name, mergedRute);
                    //setLocalData_JSON(name + "_skole", parsedSkole);
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
        //console.log("sfodag: ", entry.sfodag);
    }
    return [dayType, entry.kommentar];
};

function printMergedArray(paths) {
    var arr = getOpenData_Array(paths);
}

/*
RUTE:
dato:"2016-08-01"
elevdag:"Nei"
kommentar:""
laererdag:"Nei"
sfodag:"Ja"
skole:"Auglend skole"

SKOLE:
samme som skoledata men har Datoer array

SKOLEDATA FERDIG:
ADRESSE:"Duesvei 35"
BYGGTYP_NBR:"613"
Datoer:Array[0]
ELEVER:"ELEVER/TRINN 1.-51  2.-68  3.-51  4.- 69  5.-49  6.-45  7.-41"
Hjemmeside:"http://www.minskole.no/eiganes"
ID:"2"
INFORMASJON:"Kommunal"
KAPASITET:"13 klasserom "
KOMM:"1103"
Latitude:"58.964696"
Longitude:"5.707375"
Nord:"6540811.35"
OBJTYPE:"Bygning"
Skolenavn:"Eiganes skole"
øst:"310683.00"
*/

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

app.use(express.static('../'))
app.use('/json', express.static('JSON'))

/*
for (var currPathName in kommuneDataPaths) {
    setGet(currPathName);
}
*/

function setGet(name){
    app.get('/'+name, function (req, res) {
        res.send(kommuneArrays[name]);
    })
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(443, function () {
  console.log('Example app listening on port 443!')
})
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