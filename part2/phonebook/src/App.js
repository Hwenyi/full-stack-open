import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import personService from "./services/persons";
import SuccessMessage from "./components/Notifications";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState(""); //newName用于控制input的value
  const [newNumber, setNewNumber] = useState(""); //newNumber用于控制input的value
  const [filter, setFilter] = useState(""); //filter用于控制input的value
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    if (
      persons.some((person) => person.name === newName) &&
      persons.some((person) => person.number === newNumber)
    ) {
      setErrorMessage(`${newName} is already added to the phonebook.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      alert(`${newName} is already added to the phonebook.`);
    } else if (persons.some((person) => person.name === newName)) {
      setErrorMessage(
        `${newName} is already added to the phonebook, replace the old number with a new one`
      );
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      const person = persons.find((person) => person.name === newName);
      const confirm = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== changedPerson.id ? person : returnedPerson
              )
            );
            cleanForm();
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setSuccessMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
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
        setErrorMessage(`Delete ${person.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
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
      <SuccessMessage
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
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
