const qrText = document.getElementById('qr-text');
const generateBtn = document.getElementById('generate');
const qrContainer = document.querySelector('.qr-container');
const qrCode = document.getElementById('qr-code');

generateBtn.addEventListener('click', generateQR);

function generateQR() {
    if (!qrText.value) return;

    // Add pulse animation to button
    generateBtn.style.animation = 'buttonPulse 0.8s ease';
    
    // Remove animation after it completes
    setTimeout(() => {
        generateBtn.style.animation = '';
    }, 800);

    // Clear previous QR code
    qrCode.innerHTML = '';

    // Calculate QR code size based on container width
    const size = Math.min(200, window.innerWidth - 40);

    // Generate new QR code
    new QRCode(qrCode, {
        text: qrText.value,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show container with animation
    qrContainer.classList.add('show');

    // Add shake animation to button
    generateBtn.style.animation = 'none';
    generateBtn.offsetHeight; // Trigger reflow
    generateBtn.style.animation = 'shake 0.5s ease';
}

// Add animation reset on animation end
generateBtn.addEventListener('animationend', () => {
    generateBtn.style.animation = '';
});

// Add resize handler
window.addEventListener('resize', () => {
    if (qrText.value) {
        generateQR();
    }
});

qrText.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        generateQR();
    }
});

// Clear QR code when input is empty
qrText.addEventListener('input', () => {
    if (!qrText.value) {
        qrContainer.classList.remove('show');
    }
});
