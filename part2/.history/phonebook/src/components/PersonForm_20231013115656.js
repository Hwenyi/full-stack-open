

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleAddPeron,
}) => {
  return(
    <div>
      <form onSubmit={handleAddPeron}>
        <div>
          name: <input />
        </div>
        <div>
          number: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm