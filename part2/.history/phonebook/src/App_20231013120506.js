import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('') //newName用于控制input的value
  const [newNumber, setNewNumber] = useState('') //newNumber用于控制input的value

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber},
      />
      <h3>Numbers</h3>
      <Persons />
    </div>
  )
}

export default App
