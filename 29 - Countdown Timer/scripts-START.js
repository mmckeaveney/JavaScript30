let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now()
    // The time the timer will be finished.
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it 
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000);
};

function displayTimeLeft(seconds) {
    // Get the minutes and round it off to the nearest lowest integer
    const minutes = Math.floor(seconds / 60);
    // Get the seconds that remain
    const remainderSeconds = seconds % 60;
    // Create the display
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    // Set the text of the display to match the time string
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes}`;
}

function startTimer(e) {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));
// You can select an element directly from the document object if it has a 'name' attribute
document.customForm.addEventListener('submit', function(e) {  
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});