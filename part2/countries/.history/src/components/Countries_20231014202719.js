import axios from "axios";
import React, { useEffect } from "react";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "eca9feadef83341f04dc5a64e92d5c4f";

const Countries = ({ countries, handleShow, setWeather }) => {
  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      let weather = null;
      axios
        .get(`${weatherApiUrl}?q=${country.capital}&appid=${apiKey}`)
        .then((response) => {
          const weatherData = response.data;
          setWeather(weatherData);
        })
        .catch((error) => {
          console.log("Error fetching weather data:", error);
        });
    }
  }, [countries, setWeather]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
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
