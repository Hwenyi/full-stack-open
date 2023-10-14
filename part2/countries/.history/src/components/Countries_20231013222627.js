const Countries = ({countries}) => {
  return countries.map(country=>{
    let keys = []
    let languages = []
      for (let key in country.languages) {
          keys.push(key)
          languages.push(country.languages[key])
    }
    return (

      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>language</h2>

      </div>
    )
  })
}

export default Countries