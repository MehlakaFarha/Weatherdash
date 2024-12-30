

const apiKey = 'd77b99fd59f488010b8168bba8a9d6c3';

async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.style.display = 'none'; // Hide previous data

    // Construct the correct URL with the city and API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if there's an error in the response
        if (data.error) {
            alert('City not found or invalid API key');
            return;
        }

        // Extract the weather data
        const { location, current } = data;

        const weatherHTML1 = `
            <h2>${location.name}, ${location.country}</h2>
            <table class="table table-striped">
    <thead>
      <tr>
         <th><strong>Temperature</strong></th>
            <th><strong>Weather</strong></th>
            <th><strong>Humidity</strong></th>
            <th><strong>Wind Speed</strong></th>
           
      </tr>
    </thead>
    <tbody>
       <tr>
        
            <td> ${current.temperature}°C</td>
            <td> ${current.weather_descriptions[0]}</td>
            <td> ${current.humidity}%</td>
            <td> ${current.wind_speed} km/h</td>
            </tr>
           
    </tbody>
  </table>  
        `;
     
        weatherInfo.innerHTML = weatherHTML1;
        weatherInfo.style.display = 'block'; // Show the weather data


    } catch (error) {
        alert('Error fetching weather data');
        console.error(error);
    }
}
