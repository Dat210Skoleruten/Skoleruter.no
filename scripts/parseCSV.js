/*
 parceCSV.js downloads schoolRoutes and Schools from the Stavanger Kommune Open data.
 When download is complete it stors each of the datatypes in a session.

 Safari does not support session...so if no session we have to download data again

 The function getSchoolData combines these two datasets to one containing all schools with theirs respective routes.
 */

schoolPaths = []; // schoolPaths["skolenavn slik som på subdomenet"] = ["skolerutelink", "skolelink"]
schoolPaths["stavanger"] = ["skolerute_stavanger.csv", "skoler_stavanger.csv"]; //["https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/66c458dc-3d49-4057-9325-5481a74fa9d9/download/skolerute.csv", "https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/8d13aca1-a3b3-49d5-8728-8dc310ef9f4a/download/skoler.csv"];
schoolPaths["gjesdal"] = ["skolerute_gjesdal.csv", "skoler_gjesdal.csv"];
schoolPaths["baerum"] = ["https://open.stavanger.kommune.no/dataset/6837c1de-6dce-48a3-a8a6-e59630912779/resource/19f6c237-bc56-4c1d-bb59-4538a3215eba/download/skolerute-2016-17.csv", "https://open.stavanger.kommune.no/dataset/4a5f420f-453d-4e23-85f5-0b1d5d4a1fe0/resource/95bc274b-04bc-4a45-82ce-3d22ef46225d/download/skoler-i-baerum.csv"];
schoolPaths["trondheim"] = ["https://open.stavanger.kommune.no/dataset/7f6df84e-409c-4509-ba95-23a13d0a6730/resource/f9f73bc7-49ce-442d-92c2-3aa03c577451/download/skoleruta-2016-2017-trondheim-kommune.csv", "https://open.stavanger.kommune.no/dataset/055880c9-cb7e-4919-ab9f-e6d6ee096346/resource/70148039-78b7-43e5-b1d1-ee779971f65b/download/skolertrondheim.csv"]; //["https://open.stavanger.kommune.no/dataset/7f6df84e-409c-4509-ba95-23a13d0a6730/resource/1fae9af6-6960-4012-bba9-f68a20f6adf1/download/skoleruta-2017-2018.csv", "https://open.stavanger.kommune.no/dataset/055880c9-cb7e-4919-ab9f-e6d6ee096346/resource/70148039-78b7-43e5-b1d1-ee779971f65b/download/skolertrondheim.csv"];

console.log(getLocalData_Array_fromTreatedCSV("gjesdal"));

if (location.hostname.split('.')[0] == "dev" || location.hostname.split('.')[0] == "skoleruter") {
    window.location.href = "/kommune.html";
} else {
    if (Session.get("SelectedSet") != location.hostname.split('.')[0]) {
        Session.set("schoolRoutes", null);
        Session.set("schools", null);
    }
    Session.set("SelectedSet", location.hostname.split('.')[0]);
}

//######################################################################################
//Check if mySchools Cookes is set and go to skoler.html

if (Cookies.get("mySchools") != null && Cookies.get("visiting") == null) {
    Cookies.set("visiting", "true");
    Cookies.set("calendarType", "mySchools");
    window.location.href = '../skoler.html';
}
Cookies.set("visiting", "true");

//######################################################################################
/*
function parseData(callback) {
    if (Session.get("schoolRoutes") == null) {
        url = schoolPaths[Session.get("SelectedSet")][0];
        console.log(url);
        var start = new Date().getTime();
        console.time("Skoleruter");
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function (results) {
                console.timeEnd("Skoleruter");
                Session.set("schoolRoutes", results.data);
                parseSecondData(callback);
            }
        });
        return;
    }
    parseSecondData(callback);
}

function parseSecondData(callback) {
    if (Session.get("schools") == null) {
        url = schoolPaths[Session.get("SelectedSet")][1];

        console.time("Skoler");
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.timeEnd("Skoler");
                Session.set('schools', results.data);
                if (callback && typeof callback == "function") {
                    callback();
                }
            }
        });
        return;
    }
    if (callback && typeof callback == "function") {
        callback();
    }
}
*/


function getLocalData_Array_fromTreatedCSV(name) {
    parsedData = Papa.parse('../Node/CSV/' + name + ".csv", {
        download: true,
        header: true,
        complete: function (results) {
            return results;
        }
    }).data;
    mergedData = [];
    for (var i in parsedData) {

        mergedData[i] = {
            Skolenavn: parsedData[i].Skolenavn,
            Latitude: parsedData[i].Latitude,
            Longitude: parsedData[i].Longitude,
            Hjemmeside: parsedData[i].Hjemmeside,
            Datoer: formatDatoerFromCSV(parsedData[i].Datoer)
        }
    }
    return mergedData;
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

function getSchoolData() {
    console.time("getSchoolData");
    var schoolRoutes = Session.get("schoolRoutes");
    var schools = Session.get("schools");
    var data = [];

    for (var i = 0; i < schoolRoutes.length; i++) {
        var entry = schoolRoutes[i];
        if (data.length > 0) { // if data already has schools added to it
            var found = false;
            for (var j = 0; j < data.length; j++) {

                if (data[j].name == entry.skole) { // if the school name of the current object in data is the same as the current entry from ajax
                    found = true;
                    data[j].dates[entry.dato] = formatDato(entry); //adds date to data.dates array with the formatDato format
                } else if (data[j].name == null || entry.skole == null) {
                    //mabye error handling here? or just do nothing?
                }
                //else if(data[j].name.substr(0,1) == entry.skole.substr(0,1)){
                //console.log()
                //}
            }
            if (!found) { //if school is not already in data array, add school and current entry's date
                data.push({ name: entry.skole, dates: [] });
                data[data.length - 1].dates[entry.dato] = formatDato(entry);
            }
        } else {
            data.push({ name: entry.skole, dates: [] });
            data[data.length - 1].dates[entry.dato] = formatDato(entry);
        }
    }

    loop1:
    for (var i = 0; i < schools.length; i++) {
        schools[i]['Datoer'] = [];
        for (var j = 0; j < data.length; j++) {

            if (schools[i].Skolenavn == data[j].name) {

                schools[i].Datoer = data[j].dates;
                continue loop1;
            }
        }
        schools.splice(i, 1);
        i--;
    }
    console.timeEnd("getSchoolData");
    return schools;
}

function formatDato(entry) {
    var dayType = "";

    if (!entry || !(entry.elevdag) || !(entry.sfodag)) { // hvis undefined (gjesdal har defekt data)
        return ["111", ""];
    }

    if (entry.elevdag.toLowerCase() == "ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    dayType += "1"; // lærerdag (obsolete)

    if (entry.sfodag.toLowerCase() == "ja") {
        dayType += "1";
    } else if (entry.sfodag.toLowerCase() == "nei") {
        dayType += "0";
    } else {
        dayType += "0";
        //console.log("sfodag: ", entry.sfodag);
    }
    return [dayType, entry.kommentar];
}


