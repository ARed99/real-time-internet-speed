function updateSpeed() {
  chrome.runtime.sendMessage({ type: "getSpeed" }, (response) => {
    const speedElement = document.getElementById("speed");
    const unitElement = document.getElementById("unit");

    if (!response || !response.speed) {
      console.error("Failed to retrieve speed data.");
      speedElement.innerText = "--";
      unitElement.innerText = "Mbps";
      return;
    }

    let speed = parseFloat(response.speed) || 0;

    // Display in Mbps if speed is 1 or above, otherwise Kbps
    if (speed >= 1) {
      speedElement.innerText = speed.toFixed(1);
      unitElement.innerText = "Mbps";
    } else {
      speed *= 1000; // Convert to Kbps
      speedElement.innerText = speed.toFixed(0);
      unitElement.innerText = "Kbps";
    }

    // Trigger the jump-in effect
    speedElement.style.opacity = "1";
    speedElement.style.transform = "translateY(0)";
    unitElement.style.opacity = "1";
    unitElement.style.transform = "translateY(0)";
  });
}

// Request speed every second
setInterval(updateSpeed, 1000);

// Initial request on popup load
updateSpeed();

// Add jump-in effect on popup click
document.body.addEventListener("click", () => {
  const speedElement = document.getElementById("speed");
  const unitElement = document.getElementById("unit");

  // Reset styles for the jump-out effect
  speedElement.style.opacity = "0";
  speedElement.style.transform = "translateY(-20px)";
  unitElement.style.opacity = "0";
  unitElement.style.transform = "translateY(-20px)";

  // Delay to allow the transition to complete before updating speed again
  setTimeout(updateSpeed, 300); // Wait for the jump-out effect before updating
});