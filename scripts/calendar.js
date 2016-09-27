
console.log("schoolData:", getSchoolData());


$(document).ready(function () {
  console.log("schoolData:" , Session.get('schoolData'));
    var selected = Cookies.get('selected');
    console.log("selected school :" ,selected);
    var currentDate = new Date();
    var tmpArray = getSchoolData(); //workaround with Session
    console.log("tmpArray : ",tmpArray);
    $("#schoolName").html(selected);
    console.log(findSchool(selected, tmpArray));



});

function calendarList() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
// findSchool finds the school with the name as string from array
function findSchool(string, array){
  for (var i = 0; i < array.length; i++) {
    if (array[i].Skolenavn == string) {
      return array[i];
    }
  }
}
