var schoolText = "";

$(document).keydown(function (e) {
  var theTable = document.getElementById("indexList");

  for(var i = 0; i < theTable.getElementsByTagName('tr').length; i++){
    if(theTable.style.display == "none"){
      break;
    }else if(theTable.getElementsByTagName('tr')[i].style.display == "none"){
    }else{
      console.log("Found right school");
      schoolText = theTable.getElementsByTagName('tr')[i].firstChild.firstChild.firstChild.innerHTML;
      //changeAutoText(schoolText);
      break;
    }
  }
  if (e.keyCode == 13 && theTable.firstChild != null) {
    e.preventDefault();
    Cookies.set("calendarType", "selected");
    Cookies.set("selected", schoolText);

    window.location.href = "../calendar.html";
  }
});

function changeAutoText(schoolText){
  //document.getElementById('indexSearch');
}
