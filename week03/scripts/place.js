const TEMPERATURE = 28;   // °C
const WIND_SPEED = 14;    // km/h


function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

function displayWindChill() {
    const windChillEl = document.getElementById('wind-chill');

    if (TEMPERATURE <= 10 && WIND_SPEED > 4.8) {
        const chill = calculateWindChill(TEMPERATURE, WIND_SPEED);
        windChillEl.textContent = `${chill} °C`;
    } else {
        // Conditions not met — Greece is warm, so this is expected
        windChillEl.textContent = 'N/A';
    }
}

function displayFooterInfo() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
}

displayWindChill();
displayFooterInfo();