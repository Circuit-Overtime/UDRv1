const firebaseConfig = {
  apiKey: "AIzaSyDsQy_FL9WsiQGtXi43pl_YkBHQzbeMb9A",
  authDomain: "udr-v1.firebaseapp.com",
  projectId: "udr-v1",
  databaseURL: "https://udr-v1-default-rtdb.firebaseio.com",
  storageBucket: "udr-v1.appspot.com",
  messagingSenderId: "505956573003",
  appId: "1:505956573003:web:893ed0fc6790c9414612ce"
};



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const checkboxes = document.querySelectorAll('.commCheck');
var joystick1 = document.getElementById('joystick1');
var knob1 = document.getElementById('knob1');
var joystick2 = document.getElementById('joystick2');
var knob2 = document.getElementById('knob2');

// Initialize joystick values
var xValue1 = 1500; // center value
var yValue1 = 1500; // center value
var xValue2 = 1500; // center value
var yValue2 = 1500; // center value

// Joystick movement handler
function moveJoystick1(event) {
  var xCenter1 = joystick1.offsetLeft + joystick1.clientWidth / 2;
  var yCenter1 = joystick1.offsetTop + joystick1.clientHeight / 2;
  var x1 = event.clientX;
  var y1 = event.clientY;

  var maxDistance1 = joystick1.clientWidth / 2;

  // Calculate distance and angle from center
  var dx1 = x1 - xCenter1;
  var dy1 = y1 - yCenter1;
  var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  var angle1 = Math.atan2(dy1, dx1);

  // Limit distance to maximum
  if (distance1 > maxDistance1) {
    distance1 = maxDistance1;
  }

  // Move the knob according to distance and angle
  var xOffset1 = distance1 * Math.cos(angle1);
  var yOffset1 = distance1 * Math.sin(angle1);
  knob1.style.left = xCenter1 + xOffset1 - knob1.clientWidth / 2 + +15 + 'px';
  knob1.style.top = yCenter1 + yOffset1 - knob1.clientHeight / 2  +10 + 'px';

  // Map Y value to joystick position
  yValue1 = Math.max(Math.min(Math.round(((1 - (yOffset1 / maxDistance1)) * 500) + 1000), 2000), 1000);

  // Map X value to joystick position
  if (dx1 < -maxDistance1 / 2) {
    xValue1 = 1000;
  } else if (dx1 > maxDistance1 / 2) {
    xValue1 = 2000;
  } else {
    var xOffset1 = dx1 / (maxDistance1 / 2);
    xValue1 = Math.round(1000 + (xOffset1 + 1) * 500);
  }
  console.log(xValue1, yValue1);
  firebase.database().ref('/').update({
    throttle : yValue1,
    yaw: xValue1,
  })
}

function moveJoystick2(event) {
  var xCenter2 = joystick2.offsetLeft + joystick2.clientWidth / 2;
  var yCenter2 = joystick2.offsetTop + joystick2.clientHeight / 2;
  var x2 = event.clientX;
  var y2 = event.clientY;

  var maxDistance2 = joystick2.clientWidth / 2;

  // Calculate distance and angle from center
  var dx2 = x2 - xCenter2;
  var dy2 = y2 - yCenter2;
  var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  var angle2 = Math.atan2(dy2, dx2);

  // Limit distance to maximum
  if (distance2 > maxDistance2) {
    distance2 = maxDistance2;
  }

  // Move the knob according to distance and angle
  var xOffset2 = distance2 * Math.cos(angle2);
  var yOffset2 = distance2 * Math.sin(angle2);
  knob2.style.left = xCenter2 + xOffset2 - knob2.clientWidth / 2  + 20+ 'px';
  knob2.style.top = yCenter2 + yOffset2 - knob2.clientHeight / 2  + 'px';

  // Map Y value to joystick position
  yValue2 = Math.max(Math.min(Math.round(((1 - (yOffset2 / maxDistance2)) * 500) + 1000), 2000), 1000);

  // Map X value to joystick position
  if (dx2 < -maxDistance2 / 2) {
    xValue2 = 1000;
  } else if (dx2 > maxDistance2 / 2) {
    xValue2 = 2000;
  } else {
    var xOffset2 = dx2 / (maxDistance2 / 2);
    xValue2 = Math.round(1000 + (xOffset2 + 1) * 500);
  }
  console.log(xValue2, yValue2);
  firebase.database().ref('/').update({
    pitch : yValue2,
    roll: xValue2,
  })
}

// Auto-center the joystick knob on release
function centerKnob2() {
  var xCenter2 = joystick2.offsetLeft + joystick2.clientWidth / 2;
  var yCenter2 = joystick2.offsetTop + joystick2.clientHeight / 2;
  
  knob2.style.left = xCenter2 - knob2.clientWidth / 2 + 2+ 'px';
  knob2.style.top = yCenter2 - knob2.clientHeight / 2 + 5+ 'px';
  
  if (xValue2 < 1500) {
    xValue2 = 1000;
  } else if (xValue2 > 1500) {
    xValue2 = 2000;
  }
}


function centerKnob1() {
  var xCenter1 = joystick1.offsetLeft + joystick1.clientWidth / 2;
  var yCenter1 = joystick1.offsetTop + joystick1.clientHeight / 2;
  
  knob1.style.left = xCenter1 - knob1.clientWidth / 2  +2+ 'px';
  knob1.style.top = yCenter1 - knob1.clientHeight / 2 + 5+ 'px';
  
  if (xValue1 < 1500) {
    xValue1 = 1000;
  } else if (xValue1 > 1500) {
    xValue1 = 2000;
  }
}


// Attach joystick event listeners
joystick1.addEventListener('touchstart', function() {
  document.addEventListener('touchmove', moveJoystick1);
});
document.addEventListener('touchend', function() {
  document.removeEventListener('touchmove', moveJoystick1);
  centerKnob1();
});


joystick2.addEventListener('touchstart', function() {
  document.addEventListener('touchmove', moveJoystick2);
});
document.addEventListener('touchend', function() {
  document.removeEventListener('touchmove', moveJoystick2);
  centerKnob2();
});




function handleCheckboxCheck(event) {
  const checkbox = event.target;
  
  
  if (checkbox.checked) {
    
    firebase.database().ref('/').update({
      currMode : event.target.id
    })
    checkboxes.forEach((c) => {
      if (c !== checkbox) {
        c.checked = false;
      }
    });
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', handleCheckboxCheck);
});

// function initMap() {
//   var myLatLng = {lat: 22.895800, lng: 88.395714};

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: myLatLng,
//     disableDefaultUI : true,
//   });
// }




// https://www.openstreetmap.org/?mlat=22.89337&mlon=88.37172#map=19/22.89337/88.37172
