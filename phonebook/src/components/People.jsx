import React from "react";

const People = ({ persons, searchString }) => {
  let searchResult = persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchString.toLowerCase()),
    )
    .map((person) => (
      <li key={person.id}>
        {person.name}: {person.number}
      </li>
    ));

  return (
    <>
      <h2>Numbers</h2>
      {searchResult}
    </>
  );
};

export default People;
