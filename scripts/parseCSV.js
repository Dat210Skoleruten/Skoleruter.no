/*
 parceCSV.js downloads schoolRoutes and Schools from the Stavanger Kommune Open data.
 When download is complete it stors each of the datatypes in a session.

 Safari does not support session...so if no session we have to download data again

 The function getSchoolData combines these two datasets to one containing all schools with theirs respective routes.
 */

schoolPaths = [];
schoolPaths["stavanger"] = ["https://open.stavanger.kommune.no/dataset/86d3fe44-111e-4d82-be5a-67a9dbfbfcbb/resource/21cfc45a-d2bf-448a-a883-210ee4a96d9a/download/skolerute.csv", "https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/8d13aca1-a3b3-49d5-8728-8dc310ef9f4a/download/skoler.csv"];
schoolPaths["gjesdal"] = ["skolerute_gjesdal.csv", "skoler_gjesdal.csv"];


console.log("page is:", location.hostname);
console.log(location.hostname.split('.'));
Cookies.set("SelectedSet", location.hostname.split('.')[0]);
Console.log("selected data set:", Cookies.get("SelectedSet"));
//######################################################################################
  //Check if mySchools Cookes is set and go to skoler.html

    if( Cookies.get("mySchools") != null && Cookies.get("visiting") == null){
    Cookies.set("visiting", "true");
    Cookies.set("calendarType", "mySchools");
    window.location.href = '../skoler.html';
    }
    Cookies.set("visiting", "true");

//######################################################################################

function parseData(callback) {
    if (Session.get("schoolRoutes") == null) {
        url = schoolPaths[Cookies.get("SelectedSet")][0];
        console.log(url);
        var start = new Date().getTime();
        console.time("Skoleruter")
        Papa.parse(url, { 
            download: true,
            fastMode: true,
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
        url = schoolPaths[Cookies.get("SelectedSet")][1];

        console.time("Skoler")
        Papa.parse(url, { 
            download: true,
            fastMode: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.timeEnd("Skoler")
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

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function getSchoolData() {
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
                }
            }
            if (!found) { //if school is not already in data array, add school and current entry's date
                data.push({name: entry.skole, dates: []});
                data[data.length - 1].dates[entry.dato] = formatDato(entry);
            }
        } else {
            data.push({name: entry.skole, dates: []});
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
    return schools;
}

function formatDato(entry) {
    var dayType = "";

    if (!entry || !(entry.elevdag) || !(entry.sfodag)){ // hvis undefined (gjesdal har defekt data)
        console.log(entry);
        return ["111", ""];
    }

    if (entry.elevdag.toLowerCase() == "ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    dayType += "1"; // lærerdag (obsolete)



    if(entry.sfodag.toLowerCase() == "ja") {
        dayType += "1";
    } else if(entry.sfodag.toLowerCase() == "nei"){
        dayType += "0";
    }else{
        dayType += "0";
        //console.log("sfodag: ", entry.sfodag);
    }
    return [dayType, entry.kommentar];
};


