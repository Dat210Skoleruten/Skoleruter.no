
const http = require("http");
const Baby = require('babyparse');
fs = require('fs');
//const papa = require("papaparse.min.js");
//const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;

const kommuneArrays = [];
const kommuneDataPaths = [];
kommuneDataPaths["stavanger"] = ["https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/0f5046ee-6d37-433f-b149-6d313b087864/download/skolerute.csv",
    "https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/8d13aca1-a3b3-49d5-8728-8dc310ef9f4a/download/skoler.csv"];
kommuneDataPaths["gjesdal"] = ["skolerute_gjesdal.csv",
    "skoler_gjesdal.csv"];
kommuneDataPaths["baerum"] = ["https://open.stavanger.kommune.no/dataset/6837c1de-6dce-48a3-a8a6-e59630912779/resource/19f6c237-bc56-4c1d-bb59-4538a3215eba/download/skolerute-2016-17.csv",
    "https://open.stavanger.kommune.no/dataset/4a5f420f-453d-4e23-85f5-0b1d5d4a1fe0/resource/95bc274b-04bc-4a45-82ce-3d22ef46225d/download/skoler-i-baerum.csv"];
//kommuneDataPaths["trondheim"] = ["skolerute_trondheim.csv",
//                                "skoler_trondheim.csv"]; //["https://open.stavanger.kommune.no/dataset/7f6df84e-409c-4509-ba95-23a13d0a6730/resource/f9f73bc7-49ce-442d-92c2-3aa03c577451/download/skoleruta-2016-2017-trondheim-kommune.csv", 
//"https://open.stavanger.kommune.no/dataset/055880c9-cb7e-4919-ab9f-e6d6ee096346/resource/70148039-78b7-43e5-b1d1-ee779971f65b/download/skolertrondheim.csv"];

init();

function init() {
    console.time("init");
    //checkLocalData();
    /*for (var name in kommuneDataPaths) {
        getKommuneData(name);
    }*/
    getKommuneData("stavanger");
    console.timeEnd("init");
}

/*
function checkLocalData() { //check all csv files
    for (var currPathName in kommuneDataPaths) {
        fs.readFile("CSV/" + currPathName + ".csv", (err, file) => {
            if (err) { //if csv not found, make csv
                MakeCSV(currPathName, kommuneDataPaths[currPathName]);
            } else { //else get online data set and compare to local csv
                var openData = getOpenData_CSV(kommuneDataPaths[currPathName]);
                compare(openData, file);
            }
        });
    }
}
*/

function getKommuneData(name) {
    if (kommuneArrays[name] != null) {
        return kommuneArrays[name];
    } else {
        return setKommuneArray(name);
    }
}

function setKommuneArray(name) {
    var kommuneArray;
    /*
    fs.readFile("CSV/" + name + ".csv", (err, file) => {
        kommuneArray = getLocalData_Array_fromTreatedCSV(name);
        console.log("test");
    });
    */
    if (kommuneArray == null) {
        kommuneArray = getLocalData_Array(kommuneDataPaths[name]); // LOCAL IS ONLY TEMPORARY SHOULD BE getOpenData_Array (unless data has to be local. if so need check)
        kommuneArrays[name] = kommuneArray;
        setLocalData_CSV(name, kommuneArray);
        //throw "Cannot set kommuneArray";
    } else {
        kommuneArrays[name] = kommuneArray;
    }
    return kommuneArray;
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

function formatDatoerFromCSV(str){
    arr = []
    var lines = str.split("\[(.*?)\]");
    for(var i in lines){
        var parts = lines[i].split(";");
        arr[parts[0]] = [parts[1], parts[2]];
    }
    return arr;
}

function mergeCSV(parsedRute, parsedSkole) {
    var mergedData = [];

    for (var i = 0; i < parsedSkole.length; i++) { // filling array with data from parsedSkole
        //console.log(parsedSkole[i].Skolenavn, parsedSkole[i].Latitude, parsedSkole[i].Longitude, parsedSkole[i].Hjemmeside);
        mergedData[i] = {
            Skolenavn: parsedSkole[i].Skolenavn != null ? parsedSkole[i].Skolenavn : parsedSkole[i].skolenavn,
            Latitude: parsedSkole[i].Latitude != null ? parsedSkole[i].Latitude : parsedSkole[i].latitude,
            Longitude: parsedSkole[i].Longitude != null ? parsedSkole[i].Longitude : parsedSkole[i].longitude,
            Hjemmeside: parsedSkole[i].Hjemmeside != null ? parsedSkole[i].Hjemmeside : parsedSkole[i].hjemmeside,
            Datoer: []
        }
    }
    //console.log(parsedRute, mergedData);
    for (var i = 0; i < parsedRute.length; i++) { // adding date array to schools
        var found = false;
        for (var j = 0; j < mergedData.length; j++) {
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

function getLocalData_Array_fromTreatedCSV(name){
    parsedData = Baby.parseFiles('CSV/' + name + ".csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            return results;
        }
    }).data;
    mergedData = [];
    for(var i in parsedData){

        mergedData[i] = {
            Skolenavn: parsedData[i].Skolenavn,
            Latitude: parsedData[i].Latitude,
            Longitude: parsedData[i].Longitude,
            Hjemmeside: parsedData[i].Hjemmeside,
            Datoer: formatDatoerFromCSV(parsedData[i].Datoer)
        }
    }
}

function getLocalData_Array(name) {
    console.log(name);

    var dest = "CSVRaw/"+name+".csv";
    download(kommuneDataPaths[name][0], dest, );

    parsedRute = Baby.parseFiles(kommuneDataPaths[name][0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            console.log("results1:", results);
            return results;
        }
    }).data;
    parsedSkole = Baby.parseFiles(kommuneDataPaths[name][1], {
        download: true,
        header: true,
        complete: function (results) {
            console.log("results2:", results);
            return results;
        }
    }).data;
    var mergedSet = mergeCSV(parsedRute, parsedSkole);
    return mergedSet;
}

function download(url, dest, cb){ // download CSV from open data
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response){
        response.pipe(file);
        file.on("finish", function(){
            file.close(cb);
        });
    }).on("error", function(err){
        fs.unlink(dest);
        if(cb) cb(err.message);
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
    }else {
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



const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.write(getOpenData_Array(kommuneDataPaths["stavanger"]));
    res.end();
});

server.listen(port, hostname, () => {
    console.log("Server started on port " + port);
});