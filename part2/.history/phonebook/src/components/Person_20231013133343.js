import React from 'react';

const Person = (person, handleDelete) => {
  return (
    <div>
      <p>
        {person.name} {person.number}<sapn></sapn>   
        <button onClick={() => handleDelete(person.id)}>Delete</button>    
      </p>
        
    </div>
  );
}

export default Person;
