import React from 'react';

const Person = ({person,handleDelte}) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={handleDelte}>delete</button>
      </p>
    </div>
  );
}

export default Person;
