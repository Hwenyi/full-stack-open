import React from 'react';

const Person = (person) => {
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
