let API_KEY = `973dbcec3ab4241d2bed68fe8156b3f0`;
//let url = `https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}&units=metric`
let main = document.getElementById("main");
let weather = document.getElementById("weather")
let inp = document.getElementById("search");


main.style.backgroundImage = "url('img/sunny.jpg')"
main.style.backgroundSize = "cover"
main.style.backgroundRepeat = "no-repeat"


let getWeather = async (city)=>{
    
    weather.innerHTML =  `<div class="text-center mt-5">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>`
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

    let response = await fetch(url);
    let data = await response.json();
     return showWeather(data);
}

let showWeather = (getWeather)=>{

    if(getWeather.cod == "404"){
        weather.innerHTML = '';
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a correct city name!",
          });
    }
    else if(getWeather.cod == "400"){
        weather.innerHTML = '';
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter a city name!",
          });
    }
    else{ 

    const timestamp = getWeather.dt * 1000;
    const date = new Date(timestamp);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Convert sunrise and sunset timestamps to human-readable format
    const sunriseTimestamp = getWeather.sys.sunrise * 1000;
    const sunsetTimestamp = getWeather.sys.sunset * 1000;
    const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString();
    const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString();



    weather.innerHTML = `
    
    <div class="card border-black border-opacity-25 mb-3 d-grid bg-black p-2 text-dark bg-opacity-25" style="max-width: auto;">
    <div class=" bg-transparent border-success align-self-center">
    </div>
    <div class="card-body text-white">
    <h2 class="text-end  fs-1 fw-light">${getWeather.main.temp}&#176;C</h2>

    <p class="fw-light fs-4 text-end">${getWeather.main.temp_min}&#176;/${getWeather.main.temp_max}&#176;C</p>

    <p class="text-end fw-light fs-5">Feels Like:${getWeather.main.feels_like}&#176;C</p>

     <p class="mt-4 position-absolute top-0 start-0">
      <span class="text-start ms-2 ">${getWeather.sys.country}:</span>

    <span class="text-start">${getWeather.name}</span>    <br>

     <img class="text-start" src="https://openweathermap.org/img/wn/${getWeather.weather[0].icon}@2x.png" 
    alt=""><br>
    <span class=" fs-3 text-start ms-2">${getWeather.weather[0].main}</span>
    </p>
     <br>
   
    <span class="text-center fs-6 fw-light">Humidity:${getWeather.main.humidity}%,</span>

    <span class="text-center fs-6 fw-light">Pressure:${getWeather.main.pressure}hPa,</span>

    <span class="text-center fs-6 fw-light">Clouds:${getWeather.clouds.all}%</span>
    <br>
    <span class="text-center fs-6 fw-light">Sun Rise Time:${sunriseTime},</span><br>

    <span class="text-center fs-6 fw-light">Sun Set Time:${sunsetTime}</span>
  
    </div>

    <div class="card-footer bg-transparent border-black border-opacity-25">
    <p class="fw-light fs-5 text-info">${formattedDate}</p>
    </div>
    </div>
    `

    if(getWeather.weather[0].main.toLowerCase() == "thunderstorm"){
    let thunderstorm = ()=>{           
    main.style.backgroundImage = "url('img/thunderstorm.jpeg')"
    main.style.backgroundSize = "cover";
    main.style.backgroundRepeat= "no-repeat";
    }
    thunderstorm()
}
else if(getWeather.weather[0].main.toLowerCase() == "clouds"){
   let clouds = ()=>{
    main.style.backgroundImage = "url('img/cloudy.jpeg')"
    main.style.backgroundSize = "cover"
    main.style.backgroundRepeat = "no-repeat"
   }
   clouds()
}
else if(getWeather.weather[0].main.toLowerCase() == "snow"){
    let snow = ()=>{
        main.style.backgroundImage = "url('img/snow.jpeg')"
        main.style.backgroundSize = "cover"
        main.style.backgroundRepeat = "no-repeat"
    }
    snow()
}
else if(getWeather.weather[0].main.toLowerCase() == "drizzle"){
    let drizz = ()=>{
        main.style.backgroundImage = "url('img/drizile.jpeg')"
        main.style.backgroundSize = "cover"
        main.style.backgroundRepeat= "no-repeat";
    }
       drizz()
}

else if(getWeather.weather[0].main.toLowerCase() == "rain"){
    let rain = ()=>{
        main.style.backgroundImage = "url('img/rainy.jpeg')"
        main.style.backgroundSize = "cover"
        main.style.backgroundRepeat= "no-repeat";
    }
       rain()
}
else if(getWeather.weather[0].main.toLowerCase() == "clear"){
    let rain = ()=>{
        main.style.backgroundImage = "url('img/clear.webp')"
        main.style.backgroundSize = "cover"
        main.style.backgroundRepeat= "no-repeat";
    }
       rain()
}
else if(getWeather.weather[0].main.toLowerCase() == "smoke"
        || getWeather.weather[0].main.toLowerCase() == "mist"
        || getWeather.weather[0].main.toLowerCase() == "haze" 
        || getWeather.weather[0].main.toLowerCase() == "dust"){
    let Atmosphere = ()=>{
        main.style.backgroundImage = "url('img/misty.jpeg')"
        main.style.backgroundSize = "cover"
        main.style.backgroundRepeat = "no-repeat"
    }
    Atmosphere()
}         
else{
    main.style.backgroundImage = "url('img/smoky.jpg')";
    main.style.backgroundRepeat= "no-repeat";
    main.style.backgroundSize = "cover";
    // main.style.backgroundPosition = "center center";
    main.style.height = "100%"
}


  }  
}

let getValue = () => {
    inp.addEventListener('keydown',  (event)=> {
        if (event.key === 'Enter') {
            handleEnterKey();
            inp.value =  ""

        }
    });
}

getValue()

const handleEnterKey = ()=>{
    const inputValue = inp.value.toLowerCase();
    getWeather(inputValue);
}


  

