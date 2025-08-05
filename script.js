function makeCall() {
  window.location.href = "tel:8319428709"; // Emergency call
}

function sendSMS() {
  alert("Please use the Share Location button to send your live location.");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const mapDiv = document.getElementById("map");

  // Show on Google Map
  const map = new google.maps.Map(mapDiv, {
    center: { lat, lng },
    zoom: 15,
  });

  new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: "You are here!",
  });

  const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;
  const message = `🚨 I am in danger. This is my current location: ${locationLink}`;

  // Send WhatsApp Message
  const whatsappNumber = "918319428709"; // No "+" sign for WhatsApp link
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");

  // Send SMS (user must confirm)
  const smsNumber = "+918319428709";
  const smsURL = `sms:${smsNumber}?body=${encodeURIComponent(message)}`;
  window.location.href = smsURL;
}

function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location permission denied. Please allow it to use this feature.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get your location timed out.");
      break;
    default:
      alert("An unknown error occurred while fetching location.");
      break;
  }
}
