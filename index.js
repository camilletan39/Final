var map;
var startdate;
var enddate;
var markersLayer = new L.LayerGroup();
var code = "1X3IE_mFJTnNhYSuBZYaHL7_2G7EgWrQdSAM5Eewnwwg"

document.addEventListener('DOMContentLoaded',function(){
  map = L.map('map').setView([14.5, 120.9], 9);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){
      markersLayer.clearLayers();
      for (var i in sheet){
        var place = sheet[i];
        if (startdate==null){
          var marker= L.marker([place.latitude, place.longitude]).bindPopup(place.date + " <br>"+place.value);
        markersLayer.addLayer(marker); 
        }else{
          if(newDate(place.date) >= newDate(startdate) && newDate(place.date) <= newDate(enddate)){
          var marker= L.marker([place.latitude, place.longitude]).bindPopup(place.date + " <br>"+place.value);
        markersLayer.addLayer(marker); 
          }
        }

      }
    },
    
    simpleSheet: true 
    
  })
  markersLayer.addTo(map)
})

function updatePoints() {
 // change points
      Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      markersLayer.clearLayers();
      for (var i in sheet){
        var place = sheet[i];
        
        if (startdate==null){
          var marker= L.marker([place.latitude, place.longitude]).bindPopup("<center>"+place.date + "<br>"+place.value);
        markersLayer.addLayer(marker); 
        }else{
          if((new Date(place.date)) >= startdate && (new Date(place.date)) <= enddate){
          var marker= L.marker([place.latitude, place.longitude]).bindPopup("<center>"+place.date + "<br>"+place.value);
        markersLayer.addLayer(marker); 
          }
        }
      }
    },
    simpleSheet: true 
    
  })
markersLayer.addTo(map);
 map.invalidateSize();
 setTimeout(function(){ updatePoints(); }, 10000);}

window.addEventListener("load", function() { updatePoints(); });

$(function() {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    timePicker24Hour:true,
    autoUpdateInput: false,
    locale: {
      format: 'YYYY-MM-DD HH:mm:ss',
      cancelLabel: 'Clear'
    }
  });
});


$('input[name="datetimes"]').on('apply.daterangepicker', function(ev, picker) {
  $(this).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss') + ' - ' + picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
  startdate = new Date(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
  enddate = new Date(picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
});
