$(document).ready(function () {

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    /* Index.html */
    $("#gif1").click(function(){
        if($(this).attr("src") ==  "img/play.png"){
            $(this).attr("src", "img/Soke_og_Bruke_kalender.gif");
        }else{
            $(this).attr("src", "img/play.png");
        }
    });

    $("#gif2").click(function(){
        if($(this).attr("src") ==  "img/play.png"){
            $(this).attr("src", "img/LeggeTil_Fjerne_MineSkoler.gif");
        }else{
            $(this).attr("src", "img/play.png");
        }
    });

    $("#gif3").click(function(){
         if($(this).attr("src") ==  "img/play.png"){
            $(this).attr("src", "img/GPS.gif");
        }else{
            $(this) .attr("src", "img/play.png");
        }
    });

    /* Helpsenter in other html files than index.html */
    $("#gif4").click(function(){
        if($(this).attr("src") ==  "../img/play.png"){
            $(this).attr("src", "../img/Soke_og_Bruke_kalender.gif");
        }else{
            $(this).attr("src", "../img/play.png");
        }
    });

    $("#gif5").click(function(){
        if($(this).attr("src") ==  "../img/play.png"){
            $(this).attr("src", "../img/LeggeTil_Fjerne_MineSkoler.gif");
        }else{
            $(this).attr("src", "../img/play.png");
        }
    });

    $("#gif6").click(function(){
        if($(this).attr("src") ==  "../img/play.png"){
            $(this).attr("src", "../img/GPS.gif");
        }else{
            $(this) .attr("src", "../img/play.png");
        }
    });
});
