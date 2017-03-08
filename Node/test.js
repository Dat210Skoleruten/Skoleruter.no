const Papa = require("./papaparse.min.js");

module.exports = {

    parseData: function(url) { //skoleruter
        console.log(url);
        var start = new Date().getTime();
        console.time("Skoleruter");
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function (results) {
                console.timeEnd("Skoleruter");
                Session.set("schoolRoutes", results.data);
                parseSecondData(callback);
            }
        });
        return;
    },

    parseSecondData: function(url) { //skoler
        console.time("Skoler");
        Papa.parse(url, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.timeEnd("Skoler")
                Session.set('schools', results.data);
                if (callback && typeof callback == "function") {
                    callback();
                }
            }
        });
        if (callback && typeof callback == "function") {
            callback();
        }
        return;

    },

    testFunc: function(str){
        console.log("POAKSDPOASK");
        return str;
    }


}