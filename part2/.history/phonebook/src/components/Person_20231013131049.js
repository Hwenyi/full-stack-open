import React from 'react';

const Person = ({person, handleDelete}) => {
  return (
    <div>
      <p>
        {person.name} {person.number}       
      </p>
      
    </div>
  );
}

export default Person;
