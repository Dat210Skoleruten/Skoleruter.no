/* Hover on the school list in index.html when not on mobile */
function testHover() {
    if (!isMobile()) {
        $("#indexList td a").mouseover(function () {
            $(this).css("color", "#fff");
            $(this).css("background-color", "#495156")
        });
        $(".addbutton td a").mouseover(function () {
            $(this).css("color", "#fff");
            $(this).css("background-color", "#495156")
        });

        $("#indexList td a").mouseleave(function () {
            $(this).css("color", "#495156");
            $(this).css("background-color", "#e5e5e5")
        });
        $(".addbutton td a").mouseleave(function () {
            $(this).css("color", "#495156");
            $(this).css("background-color", "#e5e5e5")
        });
    } else {
        if (!$("#goToFave").hasClass("isInactive")) {
            showFavorites();
        }
    }
}
