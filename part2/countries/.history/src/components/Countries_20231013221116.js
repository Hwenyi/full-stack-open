const Countries = ({countries}) => {
  return countries.map(country=>{
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      </div>
    )
  })
}

export default Countries