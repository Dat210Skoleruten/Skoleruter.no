function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(58.9331, 5.5), zoom: 13
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}
