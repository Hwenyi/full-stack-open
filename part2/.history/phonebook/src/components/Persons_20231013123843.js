import Person from "./Person"

const Persons = (Persons) => {
  return (
    <div>
      {Persons.map(part => {
        return <Person key={part.name} name={part.name} />
      })}
    </div>
  )
}

export default Persons