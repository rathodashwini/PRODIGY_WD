let startTime;
let isRunning = false;
let lapTimes = [];
let lapCounter = 1;

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime();
    isRunning = true;
    updateStopwatch();
  }
}

function pauseStopwatch() {
  isRunning = false;
}

function resetStopwatch() {
  isRunning = false;
  lapTimes = [];
  lapCounter = 1;
  updateDisplay(0);
  updateLapTimes([]);
}

function lap() {
  if (isRunning) {
    const lapTime = calculateElapsedTime();
    lapTimes.push(lapTime);
    updateLapTimes(lapTimes);
    lapCounter++;
  }
}

function updateStopwatch() {
  if (isRunning) {
    const elapsed = calculateElapsedTime();
    updateDisplay(elapsed);
    setTimeout(updateStopwatch, 10);
  }
}

function calculateElapsedTime() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  return formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsPart = Math.floor((milliseconds % 1000) / 10);

  return (
    padNumber(minutes) + ':' +
    padNumber(seconds) + ':' +
    padNumber(millisecondsPart)
  );
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

function updateDisplay(time) {
  document.getElementById('display').textContent = time;
}

function updateLapTimes(times) {
  const lapTimesElement = document.getElementById('lapTimes');
  lapTimesElement.innerHTML = '';

  times.forEach((lapTime, index) => {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
    lapTimesElement.appendChild(lapItem);
  });
}
