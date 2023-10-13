import Person from "./Person"

const Persons = (Persons) => {
  return (
    <div>
      {Persons.map(part => {
        return <Person key={part.id} part={part} />
      })}
    </div>
  )
}

export default Persons