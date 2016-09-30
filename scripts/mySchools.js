
//function to check
function checkCookie(val){
  console.log(Cookies.get('mySchools') == null);
  var schoStr = "";
  var ArrOfSchools = [];
  var elem = document.getElementById(val);
  console.log(elem.firstElementChild.firstElementChild.className);
  if(Cookies.get('mySchools') == null){
    console.log("mySchools var tom!");
    Cookies.set('mySchools', val);
    elem.firstElementChild.firstElementChild.setAttribute("class", 'glyphicon glyphicon-star');
  }
  else{
    console.log("else", Cookies.get('mySchools') == null);

    schoStr = Cookies.get('mySchools');
    ArrOfSchools = schoStr.split(",");
    console.log(ArrOfSchools);
    console.log("toloaasd");
    for (var i = 0; i < ArrOfSchools.length; i++) {
      if (val == ArrOfSchools[i]) {
        ArrOfSchools.splice(i, 1);
        Cookies.set('mySchools', ArrOfSchools.toString());
        elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-star-empty';
        return;
      }
    }
    ArrOfSchools.push(val);
    Cookies.set('mySchools', ArrOfSchools.toString());
    elem.firstElementChild.firstElementChild.className = 'glyphicon glyphicon-star';
  }
}
function containsObject(val, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === val) {
            return true;
        }
    }
    return false;
}
