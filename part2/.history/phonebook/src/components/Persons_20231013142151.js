import Person from "./Person"

const Persons = ({persons,handleDelete}) => {
  return persons.map(person => {
    return (
        <Person 
          person={person}
          handleDelete={handleDelete}
        />     
    )
  })
}

export default Persons