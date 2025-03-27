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

    // Hide download button initially
    document.getElementById('download').style.display = 'none';

    // Calculate QR code size based on screen size
    const screenWidth = window.innerWidth;
    let size;
    
    if (screenWidth <= 320) {
        size = 150;
    } else if (screenWidth <= 480) {
        size = 180;
    } else {
        size = 200;
    }

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

    // Show download button after QR code is generated
    setTimeout(() => {
        document.getElementById('download').style.display = 'inline-block';
    }, 100);

    // Add shake animation to button
    generateBtn.style.animation = 'none';
    generateBtn.offsetHeight; // Trigger reflow
    generateBtn.style.animation = 'shake 0.5s ease';
}

// Add download functionality
document.getElementById('download').addEventListener('click', function() {
    const qrImage = qrCode.querySelector('img');
    if (qrImage) {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Add pulse animation to download button
        this.style.animation = 'buttonPulse 0.8s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 800);
    }
});

// Add animation reset on animation end
generateBtn.addEventListener('animationend', () => {
    generateBtn.style.animation = '';
});

// Update QR size on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (qrText.value) {
            generateQR();
        }
    }, 250); // Debounce resize events
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
        document.getElementById('download').style.display = 'none';
    }
});
