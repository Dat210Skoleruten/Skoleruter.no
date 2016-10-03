/**
 * test.js is used for testing js code
 */


function gpsDistanceTest() {
    // body...
    /*
     Oslo, Norway
     Latitude: 59.913869 | Longitude: 10.752245
     Nordagutu, Norway
     Latitude: 59.41589 | Longitude: 9.325796
     Gosen, Bergen, Norway
     Latitude: 60.30435 | Longitude: 5.27869

     Dest:
     University of Stavanger Kjell Arholmsgate 41, 4036 Stavanger, Norway
     Latitude: 58.937299 | Longitude: 5.697201

     */

    var pos = {Lat: [59.913869, 59.41589, 60.30435],
        Lon: [10.752245, 9.325796, 5.27869],
        Fasit: [306,213,154]};
    var result = [];
    for(var i=0; i < 3; i++){

        result[i] = distance(58.937299,5.697201,pos.Lat[i],pos.Lon[i]);
        var dist = result[i];

        console.log(Math.round(dist), pos.Fasit[i]);

        if(Math.round(dist) == pos.Fasit[i]){
            console.log("PASS");
        }

    }


}

function findSchoolTest() {
    // body...
    var schoolNames = "Gosen skole,Vaulen skole";
    var result = findSchool(schoolNames, getSchoolData());
    console.log("SKOLEDATA", result);

    for(var i in result) {
        console.log("Skolene", result[i].Skolenavn);
        var skoleNavnet = schoolNames.split(",");
        if(result[i].Skolenavn == skoleNavnet[i]){
            console.log("PASS");
        }
    }
}

function mySchoolsTest(argument) {
    // body...
}