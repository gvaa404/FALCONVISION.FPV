// Replace with your WhatsApp business number, including country code.
// Example: 919876543210
const WHATSAPP_NUMBER = "919999999999";

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const service = document.getElementById("service").value;
  const location = document.getElementById("location").value.trim();
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value.trim();

  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
      })
    : "Not decided yet";

  const text = `Hi falconvision.fpv, I would like to book a drone shoot.

Name: ${name}
Shoot type: ${service}
Location: ${location}
Preferred date: ${formattedDate}
Requirements: ${message || "None"}

Please share availability and pricing.`;

  if (WHATSAPP_NUMBER === "919999999999") {
    alert("Set your WhatsApp number in script.js before publishing.");
    return;
  }

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

document.getElementById("year").textContent = new Date().getFullYear();
