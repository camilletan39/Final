
var map;
var startdate;
var enddate;
var marker;
var lines;
var rownum;
var avehold1, avecount1, average1;
var avehold2, avecount2, average2;
var avehold3, avecount3, average3;
var valuetitle = ["PM 2.5", "CO", "CO2", "Temperature", "Humidity"];
var markersLayer = new L.LayerGroup();
var linesLayer = new L.LayerGroup();

var code = "1X3IE_mFJTnNhYSuBZYaHL7_2G7EgWrQdSAM5Eewnwwg"

var stations = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                   [120.995107,14.562734], [120.991562,14.570401], [120.988317,14.576076]
                ]
            },
            "properties": {
                "popupContent": "Taft Avenue",
                "propid": 1
            },
            "id": 1
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [121.015524,14.561150], [121.016303,14.559966], [ 121.024350,14.554753], [121.028802,14.550861]
                ]
            },
            "properties": {
                "popupContent": "Ayala Avenue",
                "propid": 2
            },
            "id": 2
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [121.055239,14.540512], [121.054211,14.539761], [ 121.053585,14.538619],[121.052464,14.537887], [121.051997,14.536999],[121.051799,14.535275], [121.051150,14.534740],[121.048087,14.534787],[121.046483,14.535639],[121.047019,14.536999],[121.047132,14.538297],[121.047084,14.541137],[121.048135,14.544663],[121.048780,14.545325],[121.049150,14.546717], [121.050974,14.545606],[121.052390,14.545564],[121.053559,14.546239], [121.054289,14.547412],[121.054957,14.547257],[121.055536,14.546748],[121.053712,14.545221],[121.053165,14.543944],[121.053186,14.542770],[121.053722,14.541700],[121.055239,14.540512]
                ]
            },
            "properties": {
                "popupContent": "McKinley Road",
                "propid": 3
            },
            "id": 3
        }
    ]
};

function onEachFeature(feature, layer) {
		var popupContent="";
    var e = document.getElementById("ddlViewBy");
    var boxIndex = e.options[e.selectedIndex].value;
		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}
    if(feature.properties.propid == 1){
      popupContent += "<br>" +valuetitle[boxIndex]+ " : " + document.getElementById("hdnave1").value;
        console.log("average 1");
  console.log(document.getElementById("hdnave1").value);
    }else if(feature.properties.propid == 2){
      popupContent += "<br>" +valuetitle[boxIndex]+ " : " + document.getElementById("hdnave2").value;
      console.log("average 2");
  console.log(document.getElementById("hdnave2").value);
    }else if (feature.properties.propid ==3) {
      popupContent += "<br>" +valuetitle[boxIndex]+ " : " + document.getElementById("hdnave3").value; 
      console.log("average 3");
  console.log(document.getElementById("hdnave3").value);
    }
		layer.bindPopup(popupContent);
	}

function loadAverages(){
 lines = L.geoJSON(stations, {
		style: function (feature) {
			return feature.properties && feature.properties.style;
		}, 
    style: function(feature) {
  var mag = feature.properties.propid;
  if (mag == 1) {
    var m1 = document.getElementById("hdnave1").value;
    
    if(m1>= 0 && m1<= 50){
          return {color:"green"};
          }else if(m1 >=51 && m1<=100){
            return {color:"yellow"};
          }else if(m1 >=101 && m1 <=150){
            return {color:"orange"};
          }else if(m1 >=151 && m1 <=200){
            return {color:"red"};
          }else if(m1>=201 && m1 <=300){
            return {color:"purple"};
          }else if(m1>=301 && m1<=500){
            return {color:"brown"};
          }
  } 
  else if (mag==2) {
    var m1 = document.getElementById("hdnave2").value;
    if(m1>= 0 && m1<= 50){
          return {color:"green"};
          }else if(m1 >=51 && m1<=100){
            return {color:"yellow"};
          }else if(m1 >=101 && m1 <=150){
            return {color:"orange"};
          }else if(m1 >=151 && m1 <=200){
            return {color:"red"};
          }else if(m1>=201 && m1 <=300){
            return {color:"purple"};
          }else if(m1>=301 && m1<=500){
            return {color:"brown"};
          }
  } 
  else if (mag==3) {
    var m1 = document.getElementById("hdnave3").value;
    if(m1>= 0 && m1<= 50){
          return {color:"green"};
          }else if(m1 >=51 && m1<=100){
            return {color:"yellow"};
          }else if(m1 >=101 && m1 <=150){
            return {color:"orange"};
          }else if(m1 >=151 && m1 <=200){
            return {color:"red"};
          }else if(m1>=201 && m1 <=300){
            return {color:"purple"};
          }else if(m1>=301 && m1<=500){
            return {color:"brown"};
          }
  }},
		onEachFeature: onEachFeature
	});
  linesLayer.addLayer(lines);
   linesLayer.addTo(map);
}


function loadTabletop(){
  avehold1 = 0;
  avecount1 = 0;
  average1 = 0;
  avehold2 = 0;
  avecount2 = 0;
  average2 = 0;
  avehold3 = 0;
  avecount3 = 0;
  average3 = 0;
  var e = document.getElementById("ddlViewBy");
var indexColor = e.options[e.selectedIndex].value;
  Tabletop.init({ 
    key: code,
    callback: function(sheet, tabletop){ 
      
      markersLayer.clearLayers();
      
      for (var i in sheet){
        var place = sheet[i];
        var val = place.values;
        if (startdate==null){
          if(place.values.split(';')[indexColor] >= 0 && place.values.split(';')[indexColor] <= 50){
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
          if(place.values.split(';')[indexColor] >= 0 && place.values.split(';')[indexColor] <= 50){
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

            if(parseFloat(place.longitude) < 121.0){
                avehold1+=parseFloat(val.split(';')[indexColor]);
                avecount1++;
                }else if(parseFloat(place.longitude) >= 121.0 && parseFloat(place.longitude) < 121.03){
                   avehold2+=parseFloat(val.split(';')[indexColor]);
            avecount2++;
                }else if(parseFloat(place.longitude) >= 121.03){
                   avehold3+=parseFloat(val.split(';')[indexColor]);
            avecount3++;
                 
                } 
            markersLayer.addLayer(marker); 
          }
          
        }
      }
        average1 = avehold1/avecount1;
      
        average2 = avehold2/avecount2;
      
        average3 = avehold3/avecount3;
      document.getElementById("hdnave1").setAttribute('value', Math.round(average1));
  document.getElementById("hdnave2").setAttribute('value', Math.round(average2));
  document.getElementById("hdnave3").setAttribute('value', Math.round(average3));
      document.getElementById("rowcur").setAttribute('value', Math.round(sheet.length-1));
    },
    simpleSheet: true 
    
  })
  var checkBox = document.getElementById("aveCheck");
  
  if(checkBox.checked==true){
    markersLayer.clearLayers();
    map.removeLayer(markersLayer);
    loadAverages();

  }else{
    linesLayer.clearLayers();
    map.removeLayer(linesLayer);
    markersLayer.addTo(map);
  }
  
  
  
}

document.addEventListener('DOMContentLoaded',function(){

  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  updatePoints();updatePoints();
  window.setInterval(function(){
  /// call your function here
  CheckServers();
}, 10000);
},false);



function updatePoints() {
 // change points
      loadTabletop();
 map.invalidateSize();
  CheckServers();
 }

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

function CheckServers(){
  var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    rownum = parseInt(document.getElementById("rowcur").value);
    console.log("rownum: "+rownum);
    if(rownum==parseInt(myObj.details.data.count)){
    document.getElementById("dot").style.backgroundColor = "green";
    document.getElementById("dot").title = "Server Data: " + parseInt(myObj.details.data.count) + " | Spreadsheet Data: " + rownum;
    }else{
      document.getElementById("dot").style.backgroundColor = "orange";
      document.getElementById("dot").title = "Server Data: " + parseInt(myObj.details.data.count) + " | Spreadsheet Data: " + rownum;
    }
    
  }
};
xmlhttp.open("GET", "https://io.adafruit.com/api/v2/ToastyJay/feeds/location-feed/details", true);
xmlhttp.send();
}