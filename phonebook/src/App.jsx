import { useState } from "react";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  let changeName = (e) => setNewName(e.target.value);
  let changeNumber = (e) => setNewNumber(e.target.value);
  let changeSearchString = (e) => setSearchString(e.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    let checkRepeat = persons.some((person) => person.name === newName);
    let checkNumberRepeat = persons.some(
      (person) => person.number === newNumber,
    );
    if (checkRepeat)
      alert(`${newName} : this name already exists in the phonebook`);
    else if (checkNumberRepeat)
      alert(`${newNumber} : this number already exists in the phonebook`);
    else
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]);

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Search value={searchString} onChange={changeSearchString} />

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
      />

      <People persons={persons} searchString={searchString} />
    </div>
  );
};

export default App;
