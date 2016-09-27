$(document).ready(function () {

    var selected = Cookies.get('selected');
    console.log("selected school :" ,selected);
    var currentDate = new Date();
    var tmpArray = getSchoolArray(); //workaround with Session
    console.log("tmpArray : ",tmpArray);

    for(var i = 0; i < tmpArray ; i++){
      console.log(tmpArray[i]);

    };



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


$(document).ready(function(){
    var skoleData = getSchoolArray(); //change to get school list from cookie
    var skoleName = Cookies.get("selected");
    var schools = [];
    $.each(skoleData, function(index, value){
        if(value.Skolenavn == skoleName){
            schools.push(value);
        }
    });
    console.log(schools[0]);
});