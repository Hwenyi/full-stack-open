import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name:null, number:null, id:null}
  ])
  const [newName, setNewName] = useState('') //newName用于控制input的value
  const [newNumber, setNewNumber] = useState('') //newNumber用于控制input的value

  const handleNameChange = (e) => {
    setNewName(e.target.value)
    console.log(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
    console.log(e.target.value)
  }

  const handleAddPeron = (e) => {
    e.preventDefault()
    const uniqueId = 'user_' + Date.now()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uniqueId,
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewNumber('');
    }
    console.log(persons)
  }

  const handleDelete = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    setPersons(updatedPersons);
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleAddPeron={handleAddPeron}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
