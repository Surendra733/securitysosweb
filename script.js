// Store emergency number in localStorage
function setEmergencyNumber() {
  const number = prompt("Enter your emergency number (with country code, e.g. +91...):");
  if (number) {
    localStorage.setItem("emergencyNumber", number);
    alert("Emergency number set successfully!");
  }
}

function getEmergencyNumber() {
  let number = localStorage.getItem("emergencyNumber");
  if (!number) {
    alert("No emergency number set. Please set one.");
    setEmergencyNumber();
    number = localStorage.getItem("emergencyNumber");
  }
  return number;
}

function makeCall() {
  const number = getEmergencyNumber();
  if (number) {
    window.location.href = `tel:${number}`;
  }
}

function sendSMS() {
  const number = getEmergencyNumber();
  if (number) {
    alert("Please use the Share Location button to send your live location.");
  }
}

function getLocation() {
  const number = getEmergencyNumber();
  if (!number) return;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
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

      const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;
      const message = `🚨 I am in danger. This is my current location: ${locationLink}`;

      // WhatsApp
      const whatsappURL = `https://wa.me/${number.replace("+", "")}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");

      // SMS
      const smsURL = `sms:${number}?body=${encodeURIComponent(message)}`;
      window.location.href = smsURL;

    }, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Location permission denied. Please allow it.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information unavailable.");
      break;
    case error.TIMEOUT:
      alert("Location request timed out.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}
