function printMySchools(){
  if(Cookies.get("mySchools") != null){
    console.log("funker til nå")
    var elem = document.getElementById("myFavScho");
    var theString = ""
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
}
