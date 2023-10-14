const Countries = ({countries}) => {
  return countries.map(country=>{
    return (
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>language</h2>
        <ul>
          
        </ul>
      </div>
    )
  })
}

export default Countries