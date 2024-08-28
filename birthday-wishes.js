document.getElementById('createCardBtn').addEventListener('click', function() {
    // Get user inputs
    const title = document.getElementById('cardTitleInput').value.trim() || "Happy Birthday!";
    const message = document.getElementById('cardMessageInput').value.trim() || "Wishing you a day filled with love and joy!";
    const image = document.getElementById('cardImageSelect').value;

    // Update card preview
    document.getElementById('cardTitle').textContent = title;
    document.getElementById('cardMessage').textContent = message;
    document.getElementById('cardImage').src = image;

    // Generate a URL for the custom card
    const baseUrl = window.location.origin + '/custom-card.html';
    const cardUrl = `${baseUrl}?title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}&image=${encodeURIComponent(image)}`;

    // Create a dialog box to show the generated URL
    const dialogBox = document.createElement('div');
    dialogBox.style.position = 'fixed';
    dialogBox.style.top = '50%';
    dialogBox.style.left = '50%';
    dialogBox.style.transform = 'translate(-50%, -50%)';
    dialogBox.style.backgroundColor = '#fff';
    dialogBox.style.padding = '20px';
    dialogBox.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    dialogBox.style.zIndex = '1000';
    dialogBox.style.borderRadius = '10px';
    dialogBox.style.textAlign = 'center';

    // Add content to the dialog box
    dialogBox.innerHTML = `
        <p>Your card has been created!</p>
        <input type="text" id="cardUrlInput" value="${cardUrl}" readonly style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ddd; text-align: center;">
        <button id="copyBtn" style="padding: 10px 20px; background-color: #ff6b6b; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Copy Link</button>
        <button id="closeBtn" style="margin-top: 10px; padding: 10px 20px; background-color: #333; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Close</button>
    `;

    document.body.appendChild(dialogBox);

    // Copy link to clipboard
    document.getElementById('copyBtn').addEventListener('click', function() {
        const cardUrlInput = document.getElementById('cardUrlInput');
        cardUrlInput.select();
        document.execCommand('copy');
        alert("Link copied to clipboard!");
    });

    // Close the dialog box
    document.getElementById('closeBtn').addEventListener('click', function() {
        dialogBox.remove();
    });
});
