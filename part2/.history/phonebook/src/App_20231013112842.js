import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Person from './components/Person'
import Filter from './components/Filter'
import { useState } from 'react'

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
