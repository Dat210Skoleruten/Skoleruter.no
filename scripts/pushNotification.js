//Requires push.min.js
//###############################################################################################################
// Runs the function once a day : Now runs 10am
var pushNow = new Date();
var millisTill10 = new Date(pushNow.getFullYear(), pushNow.getMonth(), pushNow.getDate(), 10, 0, 0, 0) - pushNow;

if (millisTill10 < 0) {
    millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(pushNeeded(), millisTill10);

function pushNeeded() {
    //TODO: check if push notification is needed.
    //if YES, pushMessage()
    //if NO, do nothing
    //pushCal = new calendar(Cookies.get("mySchools"), getSchoolData());
    //pushCal.checkNextWeek();
}

function pushMessange() {
    Push.create('Skolerute', {
        body: '#Test# En eller flere av dine skoler har snart feriedag. Trykk her for å se mer! #TEST#',
        icon: '../img/skolelogo.png',
        timeout: 5000,
        onClick: function () {
            //TODO: Open Skolerute/MineSkoler.html
            window.focus();
            Cookies.set("calendarType", "mySchools");
            window.location.href = "html/schools.html";
            console.log("push clicked");
            this.close();
        }

    });
}

//pushMessange();