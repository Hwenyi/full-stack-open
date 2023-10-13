import Person from "./Person"

const Persons = (persons) => {
  return persons.map(person => {
    return (
      <div key={person.name}>
        <Person name={person.name} number={person.number}/>
      </div>
    )
  })
}

export default Persons