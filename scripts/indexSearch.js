function search() {
    var input, filter, table, tr, td, i;
    input = $("#indexSearch");
    if(input.val() == 0){
        $("#myTable").hide();
    }else{
        console.log("test");
        $("#myTable").show();
    }
    filter = input.val().toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$(document).ready(function () {
    
});

// $("#indexSearch").(getListItems());

function getListItems(){
    var schoolArray = getSchoolArray();
    console.log(schoolArray);
     if ($("#myTable").children().length == 0) {
         console.log("kjører");
            $.each(schoolArray, function (index, value) {
                console.log(value);
                console.log("inni foreach");
                $("#myTable").append("<tr><td><a href='calendar.html'>" + value.Skolenavn + "</a></td></tr>");
            });
            $("#myTable").hide();
        }
}

 //<tr>
 //  <td><a href="calendar.html">Byskogen Skole</a></td>
 // </tr>
/*
$("#indexSearch").keyup(function() {
    console.log("test");
 var list = getSortedCSV();
 console.log(list);
 $.each(list, function(index, value){
     console.log("inni foreach")
     $("#myTable").html("<tr><td><a href='" + value.Skolenavn + ".html'>" + value.Skolenavn + "</a></td></tr>")
 })
}); */
