var map;
var code="1X3IE_mFJTnNhYSuBZYaHL7_2G7EgWrQdSAM5Eewnwwg"

document.addEventListener('DOMContentLoaded',function(){
  map = L.map('map').setView([14, 121], 7);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  var controlLayers = L.control.layers( null, null, {
  position: "topright",
  collapsed: false
  }).addTo(map);
  
  var light = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  }); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(light, 'Carto Light basemap');
  
  /* Stamen colored terrain basemap tiles with labels */
  var terrain = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
  }).addTo(map); // EDIT - insert or remove ".addTo(map)" before last semicolon to display by default
  controlLayers.addBaseLayer(terrain, 'Stamen Terrain basemap');
  
  
  
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
