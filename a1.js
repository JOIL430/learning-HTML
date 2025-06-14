let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function updateDisplay() {
    const time = new Date(elapsedTime);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
    document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    if (running) return;
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function stop() {
    running = false;
    clearInterval(timerInterval);
}

function reset() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
}
