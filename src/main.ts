import './style.css'

// Get elements
const clockElement = document.getElementById('clock')!;
const tzButtons = {
  current: document.getElementById('tz-current')!,
  gmt: document.getElementById('tz-gmt')!,
  pacific: document.getElementById('tz-pacific')!
};

// State
let currentTimeZone: string | undefined = undefined; // undefined = local system time

// Setup event listeners
function setTimeZone(tz: string | undefined, activeBtn: HTMLElement) {
  currentTimeZone = tz;

  // Update active state
  Object.values(tzButtons).forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');

  // Force immediate update
  updateClock();
}

tzButtons.current.addEventListener('click', () => setTimeZone(undefined, tzButtons.current));
tzButtons.gmt.addEventListener('click', () => setTimeZone('UTC', tzButtons.gmt));
tzButtons.pacific.addEventListener('click', () => setTimeZone('America/Los_Angeles', tzButtons.pacific));

/**
 * Updates the clock display with the current time.
 * Uses requestAnimationFrame for high precision trying to hit the exact frame the second changes.
 */
function updateClock() {
  const now = new Date();

  // Use Intl.DateTimeFormat for robust timezone handling
  // We recreate the formatter or use toLocaleTimeString. 
  // Given we want HH:MM:SS with 2-digits, toLocaleTimeString is efficient enough.
  const timeString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: currentTimeZone
  });

  // Only update the DOM if the time string has changed (optimization)
  if (clockElement.textContent !== timeString) {
    clockElement.textContent = timeString;
  }

  requestAnimationFrame(updateClock);
}

// Start the clock
requestAnimationFrame(updateClock);
