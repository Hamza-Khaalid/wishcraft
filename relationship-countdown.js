// Main Page JavaScript

// Function to start a new countdown
document.getElementById('startCountdownBtn').addEventListener('click', function () {
    const title = document.getElementById('eventTitleInput').value || "Our Special Day!";
    const date = document.getElementById('eventDate').value;
    const message = document.getElementById('messageInput').value || "Counting down the days!";
    
    if (date) {
        const countdownDate = new Date(date).getTime();

        // Generate a unique ID for each event
        const eventId = 'event-' + Date.now();

        // Save the event data to localStorage
        const eventData = {
            title: title,
            date: countdownDate,
            message: message
        };

        localStorage.setItem(eventId, JSON.stringify(eventData));

        // Add the countdown card
        addCountdownCard(eventId, eventData);

        // Generate a shareable link
        const shareLink = `${window.location.origin}/countdown.html?id=${eventId}`;
        document.getElementById('shareLink').value = shareLink;

        // Show the dialog box
        document.getElementById('dialogBox').style.display = 'block';
    } else {
        alert("Please select a date.");
    }
});

// Function to add a countdown card
function addCountdownCard(eventId, eventData) {
    const countdownSection = document.querySelector('.countdown-section');
    const countdownCard = document.createElement('div');
    countdownCard.className = 'countdown-card';
    countdownCard.id = eventId;

    countdownCard.innerHTML = `
        <h3>${eventData.title}</h3>
        <p>${eventData.message}</p>
        <p id="countdownTimer-${eventId}">Calculating...</p>
        <button class="delete-btn" onclick="deleteCountdown('${eventId}')">Delete Countdown</button>
    `;

    countdownSection.appendChild(countdownCard);

    // Start the countdown
    startCountdown(eventData.date, `countdownTimer-${eventId}`);
}

// Function to start the countdown
function startCountdown(countdownDate, elementId) {
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById(elementId).textContent = "Event Passed!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById(elementId).textContent = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const interval = setInterval(updateCountdown, 1000);
}

// Function to delete a countdown
function deleteCountdown(eventId) {
    const countdownCard = document.getElementById(eventId);
    countdownCard.remove();

    // Remove the event from localStorage
    localStorage.removeItem(eventId);
}

// Load saved countdowns on page load
window.onload = function () {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('event-')) {
            const eventData = JSON.parse(localStorage.getItem(key));
            addCountdownCard(key, eventData);
        }
    }
};

// Event listener for copy link button in dialog box
document.getElementById('copyLinkBtn').addEventListener('click', function () {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    shareLink.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');
    alert("Link copied: " + shareLink.value);
});

// Event listener for close button in dialog box
document.getElementById('closeDialogBtn').addEventListener('click', function () {
    document.getElementById('dialogBox').style.display = 'none';
});
