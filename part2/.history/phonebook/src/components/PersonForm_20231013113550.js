

const PersonForm = () => {
  return(
    <div>
      <form onSubmit={addNew}>
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