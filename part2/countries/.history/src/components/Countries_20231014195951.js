import React, { useEffect, useState } from "react";
import axios from "axios";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Countries = ({ countries, handleShow, weather }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const country = countries[0];
    useEffect(() => {
      axios
        .get(`${weatherApiUrl}?q=${country.capital}&appid=${apiKey}`)
        .then((response) => {
          const weatherData = response.data;
          setWeather(weatherData); // 假设你已经设置了 weather 状态
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }, [country.capital]);
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
