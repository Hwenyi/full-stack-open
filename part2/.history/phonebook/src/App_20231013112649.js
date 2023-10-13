import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import { useState } from 'react'
import Person from './../../.history/phonebook/src/components/Persons_20231013112632';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter/>
      <h3>Add a new</h3>
      <PersonForm />
    </div>
  )
}

export default App
