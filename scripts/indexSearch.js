function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("indexSearch");
    filter = input.value.toUpperCase();
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
    console.log(vals);
    console.log("test");
     if ($("#myTable").children().length == 0) {
         console.log("kjører");
            var list = getSortedCSV();
            console.log(list);
            $.each(list, function (index, value) {
                console.log("inni foreach")
                $("#myTable").html("<tr><td><a href='" + value.Skolenavn + ".html'>" + value.Skolenavn + "</a></td></tr>")
            });
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
