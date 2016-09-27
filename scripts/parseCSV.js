

if (Session.get("schoolRoutes") == null){
  console.log("schoolRoutes is null");
  Papa.parse("http://hotell.difi.no/download/stavanger/skoleruter", {
    download: true,
    header: true,
  	complete: function(results) {

      Session.set("schoolRoutes", results.data);
      console.log("schoolRoutes:" , Session.get('schoolRoutes'));
  	}
  });
}
	//console.log("ruter:", data);
if (Session.get("schools") == null){
  console.log("schools is null");
  Papa.parse("http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
      	complete: function(results) {
      	//	console.log("Finished:", results.data);
        Session.set('schools', results.data);
        console.log("schools:" , Session.get('schools'));
  	}
  });
}

// $.ajax({
// dataType: "text",
// url: "http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv",
//   success: function (e) {
// console.log("why no Cookies");
//
//     Cookies.set('v', "e");
//   }
// });



// Papa.parse("http://hotell.difi.no/download/stavanger/skoleruter", {
//   download: true,
//   header: true,
// 	complete: function(results) {
//
//      var csv = JSON.stringify(results.data);
//      console.log(csv);
//      Cookies.set("skoleruter", csv);
// 	}
// });
//
// Papa.parse("http://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/0371a1db-7074-4568-a0cc-499a5dccfe98/download/skoler.csv", {
//   download: true,
//   header: true,
//   skipEmptyLines: true,
//   complete: function(results) {
//
//     var csv = Papa.unparse(results.data);
//     Cookies.set("skoler", csv);
//   }
//
// });

function getSchoolData(){
  var schoolRoutes = Session.get("schoolRoutes");
  var schools = Session.get("schools");


  var data = []
  for (var i = 0; i < schoolRoutes.length; i++) {
      var entry = schoolRoutes[i];
      if (data.length > 0) { // if data already has schools added to it
          var found = false;
          for (var j = 0; j < data.length; j++) {
              if (data[j].name == entry.skole) { // if the school name of the current object in data is the same as the current entry from ajax
                  found = true;
                  data[j].dates[entry.dato] = formatDato(entry); //adds date to data.dates array with the formatDato format
              }
          }
          if (!found) { //if school is not already in data array, add school and current entry's date
              data.push({name: entry.skole, dates: []});
              data[data.length - 1].dates[entry.dato] = formatDato(entry);
          }
      } else {
          data.push({name: entry.skole, dates: []});
          data[data.length - 1].dates[entry.dato] = formatDato(entry);
      }
  }


  for(var i = 0 ; i < schools.length; i++){
    schools[i]['Datoer'] = [];
    for (var j = 0; j < data.length; j++) {

      if (schools[i].Skolenavn == data[j].name){

        schools[i].Datoer = data[j].dates;
      }
    }

  }

  return schools;
}

function formatDato(entry) {
    var dayType = "";

    if (entry.elevdag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    if (entry.laererdag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }

    if (entry.sfodag == "Ja") {
        dayType += "1";
    } else {
        dayType += "0";
    }
    return [dayType, entry.kommentar];
};
