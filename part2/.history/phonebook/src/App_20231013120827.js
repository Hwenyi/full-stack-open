import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('') //newName用于控制input的value
  const [newNumber, setNewNumber] = useState('') //newNumber用于控制input的value

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleAddPeron = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
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
      <Persons />
    </div>
  )
}

export default App
