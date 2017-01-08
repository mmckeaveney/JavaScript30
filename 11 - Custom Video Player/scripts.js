// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('.full_screen')

// Functions
function togglePlay(e) {
    const method = video.paused ? video.play() : video.pause();
}

function updateButton(e) {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(e) {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
    video[e.name] = e.value;
}

function handleProgress(e) {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // get the position of the click on the bar, divide it by the full width of the progress bar to get a percentage
    // then get that percentage of the videos duration and set it so it scrubs.
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen(e) {
    video.webkitRequestFullscreen();
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skip));

toggle.addEventListener('click', togglePlay);

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    mousedown && scrub(e);
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreen.addEventListener('click', toggleFullScreen);

