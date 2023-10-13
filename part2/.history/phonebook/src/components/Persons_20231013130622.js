import Person from "./Person"

const Persons = ({persons , handleDelte}) => {
  return persons.map(person => {
    return (
      <div key={person.name}>
        <Person name={person.name} number={person.number} onClick={handleDelte}/>
      </div>
    )
  })
}

export default Persons