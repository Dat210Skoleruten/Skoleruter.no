
$(document).keydown(function (e) {
  var theTable = document.getElementById("indexList");
  if(theTable.firstChild != null && theTable.style.display != "none"){
    for(var i = 0; i < theTable.firstChild.getElementsByTagName('a').length/2; i++){
      if(theTable.getElementsByTagName('tr')[i].style.display != "none"){
        console.log(theTable.firstChild.getElementsByTagName('a')[i].innerHTML);
        i++;
      }
      
    }
  }


  if (e.keyCode == 13 && theTable.firstChild != null) {
    console.log("Enter pressed!")

    // console.log(theTable.rows.length)
    console.log(theTable.firstChild.getElementsByTagName('a')[i].innerHTML); //PRINTS EIGANES SKOLE
    for(var i = 0; i < theTable.getElementsByTagName('tr').length; i++){
      console.log("Entered the for-loop!");
      console.log(theTable.firstChild.getElementsByTagName('a')[i].innerHTML);
      //trTable[i].innerHTML = "SATTAN";
      //console.log(trTable[i].innerHTML);
      if(theTable.style.display == "none"){
        break;
      }
      else if(theTable.getElementsByTagName('tr')[i].style.display == "none"){
        console.log("HELLO THERE YOU SHIT!");
        i++;
      }else{
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        Cookies.set("selected", theTable.firstChild.getElementsByTagName('a')[i].innerHTML);
        window.location.href = "calendar.html";
        break;
      }

    }

  }
});
