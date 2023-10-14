import Filter from "./components/Filter";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([])

  useEffect
  
  return (
    <div>
      <Filter/>
    </div>
  );
}

export default App;
