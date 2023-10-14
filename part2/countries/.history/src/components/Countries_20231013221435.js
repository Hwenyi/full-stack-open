const Countries = ({countries}) => {
  return countries.map(country=>{
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>language</h2>
        <ul>
          {Object.values(country.languages).map(language=>{
            return <li>{language}</li>
          })}
      </div>
    )
  })
}

export default Countries