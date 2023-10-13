import Person from "./Person"

const Persons = ({persons}) => {
  return persons.map(person => {
    return (
        <Person 
        key={person.id}
        name={person.name} 
        number={person.number}
        handleDelete={() => handleDelete(person.id)}
        />     
    )
  })
}

export default Persons