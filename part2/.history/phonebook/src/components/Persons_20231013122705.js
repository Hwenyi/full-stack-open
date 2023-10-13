const Persons = (Persons) => {
  return (
    <div>
      {Persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons