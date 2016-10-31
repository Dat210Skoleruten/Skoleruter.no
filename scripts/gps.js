tabell = document.getElementById('indexList');

function getLocation() {
    if (navigator.geolocation) {
        console.log("Geolocation is supported")
        navigator.geolocation.getCurrentPosition(findClosest);
    } else {
        document.getElementById("noPosition").style.color("red");
        console.log("Geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    //console.log(distance(position.coords.latitude, position.coords.longitude, 40.545073, -74.068443))
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

function findClosest(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    console.log("Current position lat:", lat, "lon:", lng);
    var schoolList = getSchoolData(); //Gets the data from the getSortedCSV() function in getData.js
    var dist_array = [];

    for (var i = 0; i < schoolList.length; i++) {
        //Uses global variables lat and lng which is the users coordinates, and the latitude and longitude from each school from the schoolList list
        //to calculate the distance.

        var dist = distance(lat, lng, schoolList[i]["Latitude"], schoolList[i]["Longitude"]);
        dist_array[i] = [dist, schoolList[i]["Skolenavn"]]; //Makes new array with distance an scoolname as attributes
    }

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    sorted_distance = dist_array.sort(sortFunction); //Sorts array by distance
    getIndexListItemsPos(sorted_distance);
}
