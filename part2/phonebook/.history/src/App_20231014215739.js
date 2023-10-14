import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import personService from "./services/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); //newName用于控制input的value
  const [newNumber, setNewNumber] = useState(""); //newNumber用于控制input的value
  const [filter, setFilter] = useState(""); //filter用于控制input的value

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const cleanForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleAddPeron = (e) => {
    e.preventDefault();

    const uniqueId = "user_" + Date.now();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: uniqueId,
    };
    const person = persons.find((person) => person.name === newName);
    const updateConfirm = window.confirm(
      `${person.name} is already added to the phonebook, replace the old number with a new one?`
    );
    if (updateConfirm) {
      personService.update(person.id, newPerson).then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        cleanForm();
      });
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        cleanForm();
      });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAddPeron={handleAddPeron}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
