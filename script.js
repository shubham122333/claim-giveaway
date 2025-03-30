// Your provided keys from BitLabs
const apiKey = "e9744aea-b5cd-48b5-b649-eb2c0356ec0d";
const secretKey = "mQUs0ImfXSfef4HW75ufWttCqIqrOoli";  // DO NOT expose in production client code!
const s2sKey   = "gMIZQmNMoIxwKCar8tiUS3SqtcLdSxwG";    // Typically used server-to-server

// Replace with your actual BitLabs API endpoint for fetching offers.
// This is a placeholder endpoint. You should obtain the real one from BitLabs.
const apiEndpoint = `https://api.bitlabs.example.com/offers?api_key=${apiKey}`;

// Initialize counter variables
let tasksCompleted = 0;
const totalTasks = 5;

// Update the displayed counter
function updateCounter() {
  document.getElementById('counter').innerText = `Tasks Completed: ${tasksCompleted}/${totalTasks}`;
  if (tasksCompleted >= totalTasks) {
    unlockFinalLink();
  }
}

// Unlock the final reward link when tasks are complete
function unlockFinalLink() {
  document.getElementById('finalLink').style.display = 'block';
  alert('Congratulations! You have completed 5 tasks. Your reward link is now unlocked!');
}

// Simulate task completion when a user clicks a button.
// In a real integration, completeTask() would be called upon a verified offer completion.
function completeTask() {
  tasksCompleted++;
  updateCounter();
}

// Render offers on the page by creating HTML elements for each offer
function renderOffers(offers) {
  const offerwall = document.getElementById('offerwall');
  offerwall.innerHTML = ""; // Clear any previous content
  
  // Loop through the offers array and create HTML elements
  offers.forEach((offer) => {
    const offerDiv = document.createElement('div');
    offerDiv.className = 'offer';
    
    // Create HTML content for the offer
    offerDiv.innerHTML = `
      <h3>${offer.title}</h3>
      <p>${offer.description}</p>
      <button onclick="completeTask()">Complete Task</button>
    `;
    
    offerwall.appendChild(offerDiv);
  });
}

// Fetch offers from the BitLabs API
function fetchOffers() {
  // If BitLabs requires additional authentication headers using the secret or s2s key,
  // you might include them in the fetch request options.
  const requestOptions = {
    method: 'GET',
    headers: {
      // Example header; adjust according to BitLabs documentation
      "Authorization": `Bearer ${apiKey}`,
      "X-Secret-Key": secretKey,
      "X-S2S-Key": s2sKey
    }
  };

  fetch(apiEndpoint, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(data => {
      // Assume data.offers is an array of offer objects
      if (data.offers && data.offers.length > 0) {
        renderOffers(data.offers);
      } else {
        document.getElementById('offerwall').innerText = "No offers available at the moment.";
      }
    })
    .catch(error => {
      console.error("Error fetching offers:", error);
      document.getElementById('offerwall').innerText = "Error fetching offers.";
    });
}

// When the page loads, fetch offers and initialize the counter
document.addEventListener("DOMContentLoaded", () => {
  fetchOffers();
  updateCounter();
});
