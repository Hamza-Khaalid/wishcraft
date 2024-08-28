document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('postcardCanvas');
    const ctx = canvas.getContext('2d');
    const bgColorInput = document.getElementById('bgColor');
    const messageInput = document.getElementById('message');
    const textColorInput = document.getElementById('textColor');
    const uploadImageInput = document.getElementById('uploadImage');
    const savePostcardBtn = document.getElementById('savePostcard');

    // Function to draw postcard
    function drawPostcard(imageSrc) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the background color
        ctx.fillStyle = bgColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the uploaded image to cover most of the postcard
        if (imageSrc) {
            const img = new Image();
            img.onload = function () {
                // Define margins for the polaroid look
                const sideMargin = 20; // Smaller side margins
                const topMargin = 20; // Top margin
                const bottomMargin = 80; // Bottom margin, larger for polaroid style

                const imageHeight = canvas.height - topMargin - bottomMargin;
                const imageWidth = canvas.width - 2 * sideMargin;

                // Draw image covering the top portion of the canvas
                ctx.drawImage(img, sideMargin, topMargin, imageWidth, imageHeight);
                drawText(); // Draw the text after the image has loaded
            };
            img.src = imageSrc;
        } else {
            drawText(); // Draw only the text if no image is loaded
        }
    }

    // Function to draw text at the bottom
    function drawText() {
        // Set the message text
        ctx.fillStyle = textColorInput.value;
        ctx.font = '20px Pacifico';
        ctx.textAlign = 'center'; // Center-align the text

        // Calculate text area position
        const textAreaHeight = 80; // Bottom area for text
        const textPositionY = canvas.height - textAreaHeight / 2;

        ctx.fillText(messageInput.value, canvas.width / 2, textPositionY);
    }

    // Update postcard when inputs change
    bgColorInput.addEventListener('input', function () {
        drawPostcard(uploadImageInput.files[0] ? URL.createObjectURL(uploadImageInput.files[0]) : null);
    });
    messageInput.addEventListener('input', function () {
        drawPostcard(uploadImageInput.files[0] ? URL.createObjectURL(uploadImageInput.files[0]) : null);
    });
    textColorInput.addEventListener('input', function () {
        drawPostcard(uploadImageInput.files[0] ? URL.createObjectURL(uploadImageInput.files[0]) : null);
    });

    // Handle image upload
    uploadImageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            drawPostcard(imageURL);
        }
    });

    // Save the postcard as an image
    savePostcardBtn.addEventListener('click', function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'postcard.png';
        link.click();
    });

    // Initial drawing
    drawPostcard();
});
