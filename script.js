const apiKey = 'YOUR_API_KEY'; // Get it from https://openweathermap.org/api
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].main} - ${weather[0].description}</p>
    <p>🌡️ Temp: ${main.temp} 32°C</p>
    <p>💧 Humidity: ${main.humidity}75%</p>
    <p>🌬️ Wind: ${wind.speed}12 m/s</p>
  `;
}
