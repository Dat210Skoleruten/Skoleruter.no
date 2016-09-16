
var skoleruteData = "http://hotell.difi.no/api/json/stavanger/skoleruter?"; //
var skoleData = "http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv"; //informasjon om skolene (lokasjon, adresse, kontaktinformasjon)

$(document).ready(function () { //when changing html

});


//TODO: ERROR HANDLIG

console.log("API TEST");


//getData uses ajax and therfore does not deliver data in order !!!!
function getData(attr, val) { //gets data via ajax
  var data = []
  var getUrl = skoleruteData + attr + "=" + val;
    //Firs Ajax finds number of pages & current page
    $.ajax({
      dataType: "json",
      url: getUrl,
      success: function(e){
        var page = e.page; //current page
        var pages = e.pages; //total pages
        var elements = e.elements; //total elements. Is not used
        //For-loop runs trough all pages
        for(page ; page <= pages; page++){
          tmpUrl = getUrl + "&page=" + page // adds pagenumber to url
          //Ajax gets data from all pages     
          $.ajax({
            dataType: "json",
            url: tmpUrl,
            success: function(i){
              console.log(i);
              $("#skolerute").append("<h2>" + i.page + "</h2>");
            }
          })
        }   
      }
    })
  };


  })
}







getData("skole", "Hundvåg skole");
