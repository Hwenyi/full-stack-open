const Countries = ({countries}) => {
  return countries.map(country=>{
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map(language=>{
            return <li>{language}</li>
          })}
        <ul/>
      </div>
    )
  })
}

export default Countries