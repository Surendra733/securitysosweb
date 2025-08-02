function makeCall() {
  window.location.href = "tel:8319428709"; // Indian emergency number
}

function sendSMS() {
  const message = "I am in danger. Please help me!";
  const phone = "+918319428709"; // Replace with trusted contact number
  window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const mapDiv = document.getElementById("map");

  const map = new google.maps.Map(mapDiv, {
    center: { lat, lng },
    zoom: 15,
  });

  new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: "You are here!",
  });
}
