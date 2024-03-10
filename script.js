// Selecting necessary HTML elements using their respective CSS classes
const container = document.querySelector(".container");
const searchbar = document.querySelector(".search-box button");
const weatherbox = document.querySelector(".weather-box");
const weatherinfo = document.querySelector(".weather-info");
const errornotfound = document.querySelector(".not-to-be-found");

// Adding an event listener to the searchbar button for the 'click' event
searchbar.addEventListener('click', () => {
    // API key required for accessing OpenWeatherMap API
    const APIKey = "60a837dfe8e528dd4300285281a8089a";
    // Retrieving the value entered in the search input field
    const city = document.querySelector(".search-box input").value;

    // Checking if the city value is empty
    if (!city)
        return;

    // Fetching weather data from OpenWeatherMap API using the entered city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    // Processing the response asynchronously using promises
    .then(response => response.json())
    .then(json => {
        // Handling the case when the city name is not found
        if (json.cod == "404"){
            // Adjusting container height to show error message
            container.style.height = "450px";
            weatherbox.classList.remove("active");
            weatherinfo.classList.remove("active");
            errornotfound.classList.add("active");
            return;
        }

        // Adjusting container height to show weather information
        container.style.height = "550px";
        weatherbox.classList.add("active");
        weatherinfo.classList.add("active");
        errornotfound.classList.remove("active");

        // Updating weather icon based on weather condition
        const image = document.querySelector(".weather-box img");
        switch(json.weather[0].main) {
            case "Clear":
                image.src = "weather images/clear.png";
                break;
            case "Clouds":
                image.src = "weather images/clouds.png";
                break;
            case "Rain":
                image.src = "weather images/rain.png";
                break;
            case "Drizzle":
                image.src = "weather images/drizzle.png";
                break;
            case "Mist":
                image.src = "weather images/mist.png";
                break;
            case "Snow":
                image.src = "weather images/snow.png";
                break;
            case "Wind":
                image.src = "weather images/wind.png";
                break;
            default:
                image.src = "weather images/clouds.png";
        }

        // Giving Smooth transition for temperature and description updates
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        temperature.style.transition = "opacity 0.10s ease";
        description.style.transition = "opacity 0.5s ease";
        temperature.style.opacity = "0";
        description.style.opacity = "0";

        // Delayed update of temperature and description for smooth transition effect
        setTimeout(() => {
            temperature.textContent = `${json.main.temp} °C`;
            description.textContent = json.weather[0].description;
            temperature.style.opacity = "1";
            description.style.opacity = "1";
        }, 500);

        // Smooth transition for humidity and wind updates
        const humidity = document.querySelector(".humidity-info span");
        const wind = document.querySelector(".wind-info span");
        humidity.style.transition = "opacity 0.5s ease";
        wind.style.transition = "opacity 0.5s ease";
        humidity.style.opacity = "0";
        wind.style.opacity = "0";

        // Delayed update of humidity and wind for smooth transition effect
        setTimeout(() => {
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} Km/Hr`;
            humidity.style.opacity = "1";
            wind.style.opacity = "1";
        }, 500);
    });
});


