import React from 'react';

const Person = (person, handleDelete) => {
  return (
    <div>
      <p>
        {person.name} {person.number}       
      </p>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
}

export default Person;
