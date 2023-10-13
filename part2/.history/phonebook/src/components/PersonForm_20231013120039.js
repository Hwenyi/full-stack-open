

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAddPeron,
  handleNameChange,
  handleNumberChange
}) => {
  return(
    <div>
      <form onSubmit={handleAddPeron}>
        <div>
          <label>Name: </label>
          <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <label>Number: </label>
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm