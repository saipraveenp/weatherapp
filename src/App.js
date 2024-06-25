import "./App.css";

import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const api = {
  key: "745805e005d7ffeaa7c5ad678758f56a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const [loader, setLoader] = useState(false)
  const searchPressed = () => {
    setLoader(true)

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setLoader(false)
        console.log(result, "r")
      });
  };
  const weatherEmojis = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'haze': '☁️',
    'shower rain': '🌧️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
  };
  console.log(weatherEmojis.hasOwnProperty(Object.keys(weather).length > 0 && weather?.weather[0]?.description?.toLowerCase()), "t")
  const report = Object.keys(weather).length > 0 && weather?.weather[0]?.description?.toLowerCase()
  const weatherEmoji = weatherEmojis[report || '🌦️'];
  console.log(weatherEmoji, "ds", weather)
  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER  */}

        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        {loader &&
          <CircularProgress />

        }


        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            {weatherEmoji || ""}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          <div style={{ color: "red" }} >
            {weather?.message}

          </div>
        )}
      </header>
    </div>
  );
}

export default App;
