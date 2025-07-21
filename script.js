document.addEventListener('DOMContentLoaded', () => {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const weatherInfo = document.getElementById('weather-info');
    const apiKey = '72aec7c5156b48c3b6c03122252107';


    searchButton.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });


    function fetchWeather(location) {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;


        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
                } else {
                    displayWeather(data);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = `<p>Could not retrieve weather data.</p>`;
            });
    }


    function displayWeather(data) {
        const { location, current } = data;
        weatherInfo.innerHTML = `
            <h2>${location.name}, ${location.country}</h2>
            <p>Temperature: ${current.temp_c}°C</p>
            <p>Condition: ${current.condition.text}</p>
            <img src="https:${current.condition.icon}" alt="Weather icon">
        `;
    }
});
