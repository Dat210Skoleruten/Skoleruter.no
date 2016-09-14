/* This file contains code interacting with the http://hotell.difi.no/api/json/stavanger/skoleruter api
*/
var APIurl = "http://hotell.difi.no/api/json/stavanger/skoleruter?page=25"


$(document).ready(function() {
console.log("API TEST");
  $.ajax({
    dataType:"json",
    url: APIurl,
    success : success // calls success function if successful

  })

  function success(e){
    $.each(e, function(index, value){
      console.log(value);
    })
  }

});
