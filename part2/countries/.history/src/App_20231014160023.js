import Filter from "./components/Filter";
import Countries from "./components/Countries";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("promise fulfilled");
        setCountries(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const tooManyCountries = countriesToShow.length > 10;

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
