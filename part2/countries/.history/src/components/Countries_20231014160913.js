const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>

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
  }
};

export default Countries;
