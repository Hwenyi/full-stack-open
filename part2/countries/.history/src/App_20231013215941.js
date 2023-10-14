import Filter from "./components/Filter";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(response=>{
      console.log('promise fulfilled')
      setCountries(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])

  
  
  return (
    <div>
      <Filter/>
    </div>
  );
}

export default App;
