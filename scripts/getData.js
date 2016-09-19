
var skoleruteData = "http://hotell.difi.no/api/json/stavanger/skoleruter?"; //
var skoleData = "http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv"; //informasjon om skolene (lokasjon, adresse, kontaktinformasjon)

//TODO: ERROR HANDLIG

console.log("API TEST");

/*
//getData uses ajax and therfore does not deliver data in order !!!!
function getData(attr, val) { //gets data via ajax
  var data = []
  var getUrl = skoleruteData + attr + "=" + val;
  //Firs Ajax finds number of pages & current page
  $.ajax({
    dataType: "json",
    url: getUrl,
    success: function (e) {
      var page = e.page; //current page
      var pages = e.pages; //total pages
      var elements = e.elements; //total elements. Is not used
      //For-loop runs trough all pages
      for (page; page <= pages; page++) {
        tmpUrl = getUrl + "&page=" + page // adds pagenumber to url
        //Ajax gets data from all pages     
        $.ajax({
          dataType: "json",
          url: tmpUrl,
          success: function (i) {
            console.log(i);
            $("#skolerute").append("<h2>" + i.page + "</h2>"); // prints page numbers? 
          }
        })
      }
    }
  })
};

*/

function getAllData() { //collects all data and sorts it in an array. Structure for the returned array is at the end of the script.
  var data = []
  var getUrl = skoleruteData;
  //Firs Ajax finds number of pages & current page
  $.ajax({
    dataType: "json",
    url: getUrl,
    success: function (e) {
      var page = e.page; //current page
      var pages = e.pages; //total pages
      var elements = e.elements; //total elements. Is not used
      //For-loop runs trough all pages
      for (page; page <= pages; page++) {
        tmpUrl = getUrl + "&page=" + page // adds pagenumber to url
        //Ajax gets data from all pages     
        $.ajax({
          dataType: "json",
          url: tmpUrl,
          success: function (obj) {
            for (var i = 0; i < obj.entries.length; i++) {
              var entry = obj.entries[i];
              if (data.length > 0) { // if data already has schools added to it
                var found = false;
                for (var j = 0; j < data.length; j++) {
                  if (data[j].name == entry.skole) { // if the school name of the current object in data is the same as the current entry from ajax
                    found = true;
                    data[j].dates[entry.dato] = formatDato(entry); //adds date to data.dates array with the formatDato format
                  }
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
          }
        })
      }
    }
  })
  return data;
};


function formatDato(entry) {
  var dayType = "";

  if (entry.elevdag == "Ja") {
    dayType += "1";
  } else {
    dayType += "0";
  }

  if (entry.laererdag == "Ja") {
    dayType += "1";
  } else {
    dayType += "0";
  }

  if (entry.sfodag == "Ja") {
    dayType += "1";
  } else {
    dayType += "0";
  }
  return [dayType, entry.kommentar];
};

var SkoleRuteArray = getAllData();
console.log(SkoleRuteArray);

//getData("skole", "Hundvåg skole");

/*
Entry (in the getAllData function) structure:

dato:"2015-10-30"
elevdag:"Ja"
kommentar:""
laererdag:"Ja"
sfodag:"Nei"
skole:"Tastaveden skole"


 getAllData() returned array (skoleRuteData) stucture:

var skoleRuteData = [];
skoleRuteData[0] = {
  navn: "Hundvåg skole",
  datoer: ["2015-08-12" : [101, "Planleggingsdag"], "2015-08-13" : [110, ""] ] // 101: elevdag: true, laererdag: false, sfodag: true

*/