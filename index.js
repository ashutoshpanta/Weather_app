const weatherForm = document.querySelector(".weatherForm");         //gets element by querySelector since it is a class
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "***************************";                       // generate api key from openweathermap.org webpage

weatherForm.addEventListener("submit", async event => {


    event.preventDefault();                                         //prevents refresh default behaviour for form                             

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);        //preseed event parameter with async to use await
            displayWeatherInfo(weatherData);


        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("please enter a city");
    }


});

async function getWeatherData(city){                              //fetches weather data from openweathermap.org webpage

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){                                             //checks response is ok or not to return json data
        throw new Error("Could not fetch weather data");
    }

    return await response.json();


}

function displayWeatherInfo(data){

    const {name: city,                                            // {} object destructuring
           main: {temp, humidity},
           weather: [{description, id}]} = data;                  // [{}] array destructuring followed by object destructuring
    card.textContent = "";
    card.style.display = "flex"; 
    
    const cityDisplay = document.createElement("h1");             
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("h1");
    const descDisplay = document.createElement("h1");
    const weatherEmoji = document.createElement("h1");

    cityDisplay.textContent = city;                               
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C` ;
    humidityDisplay.textContent = `Humidity: ${humidity}%` ;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){                                              //uses switch case for weather condition group codes.
        case(weatherId >= 200 && weatherId < 300):
             return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
             return "🌦️";
        case(weatherId >= 500 && weatherId < 600):
             return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
             return "🌨️"; 
        case(weatherId >= 700 && weatherId < 800):
             return "🌤️"; 
        case(weatherId === 800):
             return "☀️"; 
        case(weatherId >= 801 && weatherId < 810):
             return "☁️";
        default:
             return "🛸";                      

    }

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
