import Filter from "./components/Filter";
import { useState } from "react";

function App() {
  const [countries, setCountries] = useState([])
  
  return (
    <div>
      <Filter/>
    </div>
  );
}

export default App;
