import Filter from "./components/Filter";

function App() {
  const [countries, setCountries] = useState([])
  
  return (
    <div>
      <Filter/>
    </div>
  );
}

export default App;
