var map;
var code="1X3IE_mFJTnNhYSuBZYaHL7_2G7EgWrQdSAM5Eewnwwg"

document.addEventListener('DOMContentLoaded',function(){
  map = L.map('map').setView([14, 121], 7);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      for (var i in sheet){
        var place = sheet[i];
        L.marker([place.latitude, place.longitude])
          .addTo(map)
          .bindPopup(place.name)
      }
    },
    simpleSheet: true 
  })
  
})