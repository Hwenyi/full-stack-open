import Person from "./Person"

const Persons = (persons) => {
  return (
    <div>
      {Persons.map(person => {
        return (
          <Person key={person.name} person={person} />
        )
      })}
    </div>
  )
}

export default Persons