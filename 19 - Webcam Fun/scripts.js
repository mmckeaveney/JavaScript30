const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    // Get the camera using a promise
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then((stream) => {
        // Create a url from the stream and play it with the video
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }).catch((err) => console.error('error connecting to webcam', err)); 
}

function paintToCanvas() {
    // Gets the video width and height and sets the canvas to the same width and height
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw the image from the webcam to the canvas after a short delay
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i] + 100 // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50 // green 
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5 // blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i] + 100 // red
        pixels.data[i + 100] = pixels.data[i + 1] - 50 // green 
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5 // blue
    }
    return pixels;
}


function takePhoto() {
    // Play the sound
    snap.currentTime = 0;
    snap.play();
    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // Create the link to the file, but show the image as the src so that you can choose which ones to save.
    const link = document.createElement('a')
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Fella" />`;

    // Insert it before the strip at the bottom
    strip.insertBefore(link, strip.firstChild);
}

getVideo();

// When the video can play, start painting it to the canvas.
video.addEventListener('canplay', paintToCanvas);
