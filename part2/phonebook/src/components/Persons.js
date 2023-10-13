import Person from "./Person"

const Persons = ({persons,handleDelete}) => {
  return persons.map(person => {
    return (
        <Person 
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        />     
    )
  })
}

export default Persons