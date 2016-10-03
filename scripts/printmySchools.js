function printMySchools(){
  var elem = document.getElementById("myFavScho");

  if(Cookies.get("mySchools") != null){
    console.log("funker til nå")
    var theString = "Skoler valgt: "
    var arr = Cookies.get("mySchools").split(",");
    for(var i = 0; i < arr.length; i++){
      if(i == arr.length -1){
          theString += arr[i] + ".";
      }
      else{
        theString += arr[i] + ", ";
      }
    }
    elem.innerHTML = theString;
  }
  else{
    elem.innerHTML = "Ingen skoler valgt!";
    elem.style.color = "red";
  }
}
