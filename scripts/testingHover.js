function testHover(){
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
     $("#title").css("color", "red");
  }
 else {
     $("#indexList td a").mouseover(function(){
        console.log("Entering");
        $(this).css("color", "#fff");
        $(this).css("background-color", "#495156")
    });
    $(".addbutton td a").mouseover(function(){
        $(this).css("color", "#fff");
        $(this).css("background-color", "#495156")
    });
    
    $("#indexList td a").mouseleave(function(){
        $(this).css("color", "#495156");
        $(this).css("background-color", "#e5e5e5")
    });
    $(".addbutton td a").mouseleave(function(){
        $(this).css("color", "#495156");
        $(this).css("background-color", "#e5e5e5")
    });
    
  }

    
}
    