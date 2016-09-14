
var skoleruteData = "http://hotell.difi.no/api/json/stavanger/skoleruter?"; //
var skoleData = "http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv"; //informasjon om skolene (lokasjon, adresse, kontaktinformasjon)

$(document).ready(function () { //when changing html

});

console.log("API TEST");



function getData(attr, val) { //gets data via ajax
  var getUrl = skoleruteData + attr + "=" + val;
  $.ajax({
    dataType: "json",
    url: getUrl,
    success: success // calls success function if successful

  })
}

function success(e) { //handling data
  console.log(e);
}


getData("skole", "Hundvåg skole");