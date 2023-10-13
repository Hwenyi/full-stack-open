import Person from "./Person"

const Persons = ({persons,handleDelete}) => {
  return persons.map(person => {
    return (
        <Person 
        key={person.number+Math.random()}
        name={person.name} 
        number={person.number}
        handleDelete={() => handleDelete(person.id)}
        />     
    )
  })
}

export default Persons