var map;
var startdate;
var enddate;
var marker;
var valuetitle = ["PM 2.5", "Temperature", "CO", "CO2"];
var markersLayer = new L.LayerGroup();

var code = "1X3IE_mFJTnNhYSuBZYaHL7_2G7EgWrQdSAM5Eewnwwg"



function loadTabletop(){
  var e = document.getElementById("ddlViewBy");
var indexColor = e.options[e.selectedIndex].value;
  Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      markersLayer.clearLayers();
      
      for (var i in sheet){
        var place = sheet[i];
        var val = place.value;
        if (startdate==null){
          if(val.split(';')[indexColor] >= 0 && val.split(';')[indexColor] <= 50){
          marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'green'});
          }else if(val.split(';')[indexColor]>=51 && val.split(';')[indexColor] <=100){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'yellow'});
          }else if(val.split(';')[indexColor]>=101 && val.split(';')[indexColor] <=150){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'orange'});
          }else if(val.split(';')[indexColor]>=151 && val.split(';')[indexColor] <=200){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'red'});
          }else if(val.split(';')[indexColor]>=201 && val.split(';')[indexColor] <=300){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'purple'});
          }else if(val.split(';')[indexColor]>=301 && val.split(';')[indexColor] <=500){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'yellow'});
          }
        marker.bindPopup(place.date + " <br><center>"+valuetitle[indexColor]+": "+ val.split(';')[indexColor]);
        markersLayer.addLayer(marker); 
        }else{
          if((new Date(place.date)) >= startdate && (new Date(place.date)) <= enddate){
          if(val.split(';')[indexColor] >= 0 && val.split(';')[indexColor] <= 50){
          marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'green'});
          }else if(val.split(';')[indexColor]>=51 && val.split(';')[indexColor] <=100){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'yellow'});
          }else if(val.split(';')[indexColor]>=101 && val.split(';')[indexColor] <=150){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'orange'});
          }else if(val.split(';')[indexColor]>=151 && val.split(';')[indexColor] <=200){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'red'});
          }else if(val.split(';')[indexColor]>=201 && val.split(';')[indexColor] <=300){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'purple'});
          }else if(val.split(';')[indexColor]>=301 && val.split(';')[indexColor] <=500){
            marker= L.circleMarker([place.latitude, place.longitude],{radius:11, color:'yellow'});
          }
          marker.bindPopup(place.date + " <br><center>"+valuetitle[indexColor]+": "+ val.split(';')[indexColor]);
        markersLayer.addLayer(marker); 
          }
        }
      }
    },
    simpleSheet: true 
    
  })
markersLayer.addTo(map);
}

document.addEventListener('DOMContentLoaded',function(){

  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

loadTabletop();
})



function updatePoints() {
 // change points
      loadTabletop()
 map.invalidateSize();
 setTimeout(function(){ updatePoints(); }, 10000);}

window.addEventListener("load", function() { updatePoints(); });

$(function() {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    timePicker24Hour:true,
    autoUpdateInput: false,
    "drops": "up",
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