import axios from "axios";
import React, { useEffect, useState } from "react";

const Countries = ({ countries, handleShow }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (countries.length === 1) {
      const apiKey = "eca9feadef83341f04dc5a64e92d5c4f";
      const country = countries[0];
      const lat = country.capitalInfo.latlng[0];
      const lon = country.capitalInfo.latlng[1];
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      axios
        .get(url)
        .then((response) => {
          const weatherData = response.data;
          setWeather(weatherData);
          console.log(weatherData);
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }
  }, [countries]);

  if (!weather) {
    return null;
  }

  const icon = weather.weather[0].icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>capital {countries[0].capital}</p>
        <p>area {countries[0].area}</p>

        <h3>languages</h3>
        <ul>
          {Object.values(countries[0].languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={countries[0].flags.png}
          alt={`flag of ${countries[0].name.common}`}
          width="200"
        />
        <h3>Weather in {countries[0].capital}</h3>
        <p>
          <b>temperature:</b> {weather.main.temp} Celsius
        </p>
        <img src={weatherIconUrl} width=/>
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleShow(country)}>Show</button>
          </p>
        ))}
      </div>
    );
  }
};

export default Countries;
