import { useEffect } from "react";
import axios from "axios";

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const Countries = ({ countries, handleShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const country = countries[0];

    //获取天气数据
    useEffect(() => {
      axios.get(`${weatherApiUrl}?q=${country.capital}&appid=${apiKey}`);
    });
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
