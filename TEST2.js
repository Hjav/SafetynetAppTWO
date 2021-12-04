let button = document.getElementById('btn')
let alert = document.querySelector('#alert')
console.log(button)
button.addEventListener('mouseover', e=>{
    button.classList.toggle('green')
}) 

let trackerId = 0;
let geocoder;
var map;
var x;
var y;
var x2;
var y2;
var z;
let q;
var distanceKMF;
var distanceKME;
var distance;
let distanceFire;
var v;
let distanceSchool1;
let distanceS1;
let distanceSchool2;
let distanceS2;
let distanceChurch;
let distanceC;

function soundChurch(){
  var audio = document.createElement("audio");
  audio.src = "Church.mp3";
  audio.addEventListener("ended", function () {
      document.removeChild(this);
  }, false);
  audio.play(); 
}

function soundSchool(){
  var audio = document.createElement("audio");
  audio.src = "Pendleton Dr.mp3";
  audio.addEventListener("ended", function () {
      document.removeChild(this);
  }, false);
  audio.play(); 
}

function soundFire(){
  var audio = document.createElement("audio");
  audio.src = "Fire.mp3";
  audio.addEventListener("ended", function () {
      document.removeChild(this);
  }, false);
  audio.play(); 
}

function soundEMS(){
  var audio = document.createElement("audio");
  audio.src = "EMS.mp3";
  audio.addEventListener("ended", function () {
      document.removeChild(this);
  }, false);
  audio.play(); 
}


// pulls ems indication for car 1 from field 2
function thingspeakEMS() {
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/2/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  q = Number(m.field2);
  // console.log(q)
  });
  console.log("Look here: " + q)
  // distanceBTWpoints(q)
  return q
}

// calculate distance from ems vehicle
function distanceBTWpointsEMS(q){
  console.log("-------------------------------------")
  console.log(q)
  if (q == 1) {
    let lat1 = x 
    let lon1 = y
    console.log("---------------------------------------------")
    console.log(y)
    let  lat2 = x2 
    let lon2 = y2
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    distanceKME = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km 
    distance = distanceKME * 0.621371
    
    console.log(distance)
    } else{

    }
    if (distance < 0.25) {
      document.getElementById('EMSwarn').style.display = "block"
      soundEMS();
      distance = 5
      
      
    } else {
        document.getElementById('EMSwarn').style.display = "none"
      } 
}
// calculate distance from FD vehicle
function distanceBTWpointsFIRE(q){
  console.log("-------------------------------------")
  console.log(q)
  if (q == 2) {
    let lat1 = x 
    let lon1 = y
    console.log("---------------------------------------------")
    console.log(y)
    let  lat2 = x2 
    let lon2 = y2
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

    distanceKMF = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km 
    distanceFire = distanceKMF * 0.621371
    
    console.log(distanceFire)
    } 
    if (distanceFire < 0.25) {
      document.getElementById('fireWarn').style.display = "block"
      soundFire();
      distanceFire = 5
      
      
    } 
    else {
      document.getElementById('fireWarn').style.display = "none"
    } 
}

function distanceToSchools(){
 
  let lat1 = x 
  let lon1 = y
  let  lat2 = 30.612880
  let lon2 = -96.325681
  let lat3 = 30.612344
  let lon3 = -96.330669
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  var b = 0.5 - c((lat3 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat3 * p) * 
          (1 - c((lon3 - lon1) * p))/2;

  distanceS1 = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km 
  distanceSchool1 = distanceS1 * 0.621371
  distanceS2 = 12742 * Math.asin(Math.sqrt(b)); // 2 * R; R = 6371 km 
  distanceSchool2 = distanceS1 * 0.621371
  
  console.log(distanceSchool1)
  
  if (distanceSchool1 < 0.1 || distanceSchool2 < 0.1) {
    document.getElementById('schoolWarn').style.display = "block"
    soundSchool();
  } else {
    document.getElementById('schoolWarn').style.display = "none"
  } 
}

function distanceToChurch(){
 
  let lat1 = x 
  let lon1 = y
  let  lat2 = 30.610636
  let lon2 = -96.322703
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  distanceC = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km 
  distanceChurch = distanceC * 0.621371
  
  console.log(distanceChurch)
  
  if (distanceChurch < 0.1 ) {
    document.getElementById('churchWarn').style.display = "block"

    soundChurch(); 
  } else {
    document.getElementById('churchWarn').style.display = "none"
  } 
}




// send ems indication to field 8
function emsIcon() {
  z = 1; 
  var url = 'https://api.thingspeak.com/update?api_key=NUQD36RO2XTFH4TA&field8=1';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

  var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
  }`;

  xhr.send(data);
  initialize()
}

function citizenIcon() {
  z = 0;
  var url = 'https://api.thingspeak.com/update?api_key=NUQD36RO2XTFH4TA&field8=0';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

  var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
  }`;

  xhr.send(data);
  initialize()
}
// send FD indication to field 8
function fireIcon() {
  z = 2;
  var url = 'https://api.thingspeak.com/update?api_key=NUQD36RO2XTFH4TA&field8=2';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

  var data = `{
    "Id": 78912,
    "Customer": "Jason Sweet",
    "Quantity": 1,
    "Price": 18.00
  }`;

  xhr.send(data);
  initialize()
}


$(document).ready(function(){
  loadmaps();
  loadmaps2();
  emsIcon();
  fireIcon();
  citizenIcon();
  
  //check for new updates
  setInterval('loadmaps()',500)
  setInterval('loadmaps2()',500)
});

$(document).ready(function(){
  thingspeakEMS();
  distanceBTWpointsEMS(q);
  distanceBTWpointsFIRE(q);
  distanceToSchools();
  distanceToChurch();
  //check for new updates
  setInterval('thingspeakEMS()',5000)
  setInterval('distanceBTWpointsEMS(q)',5000)
  setInterval('distanceBTWpointsFIRE(q)',5000)
  setInterval('distanceToSchools();',5000)
  setInterval('distanceToChurch();',5000)
});

function loadmaps(){

  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/6/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  x= Number(m.field6); //lat1
  
  });
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/7/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var m = result;
  y= Number(m.field7); //long 1
  

  })  
}

function loadmaps2(){

  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/4/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var n = result;
  x2= Number(n.field4);  //lat 2
                  //alert(x);

  });
  $.getJSON("https://api.thingspeak.com/channels/1561045/fields/5/last.json?api_key=KIBFWZ0FG2BLM80I", function(result){

  var n = result;
  y2= Number(n.field5);  //long2
  
    
  })  
}

/*window.setInterval(function(){initialize();}, 5000);*/

function initialize() {
    //alert(y);
  var mapOptions = {
    zoom: 18,
    center: {lat: x, lng: y}
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  switch (z) {
    case 0:
      var marker = new google.maps.Marker({
        position: {lat: x, lng: y},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;

      case 1:
        var marker = new google.maps.Marker({
          position: {lat: x, lng: y},
          map: map,
          icon:{
            url: "hospital.png",
          scaledSize: new google.maps.Size(31, 31)
          },
        });
        break;

        case 2:
          var marker = new google.maps.Marker({
            position: {lat: x, lng: y},
            map: map,
            icon:{
              url: "firetruck.png",
            scaledSize: new google.maps.Size(61, 51)
            },
          });
          break;
  
    default:
      var marker = new google.maps.Marker({
        position: {lat: x, lng: y},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
  }

  switch (q) {
    case 1:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "hospital.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
    case 2:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "firetruck.png",
        scaledSize: new google.maps.Size(61, 51)
        },
      });
      break;
  
    default:
      var marker2 = new google.maps.Marker({
        position: {lat: x2, lng: y2},
        map: map,
        icon:{
          url: "car.png",
        scaledSize: new google.maps.Size(31, 31)
        },
      });
      break;
  }
  
  
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Marker Location:' + marker.getPosition() + '</p>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  var recalculate = setInterval (function(){
    lat = x;
    long = y;
    map.setCenter({lat:lat, lng:long, alt:0});
    marker.setPosition({lat:lat, lng:long, alt:0});
  },500);

  var recalculate2 = setInterval (function(){
    lat = x2;
    long = y2;
  },500);

  trackerId = navigator.geolocation.watchPosition(function(pos) {
    var latLng = new google.maps.LatLng(
      x,
      y
    );
    map.setCenter(latLng);
    marker.setPosition(latLng);
    map.panTo({ x, y })
    enableHighAccuracy: true;
    maximumAge: 0;
    timetout: 5000;
  });
}

const stopTracking = () => {
  if (trackerId) {
    navigator.geolocation.clearWatch(trackerId);
  }
};

google.maps.event.addDomListener(window, 'load', initialize);

