import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  let changeName = (e) => setNewName(e.target.value);
  let changeNumber = (e) => setNewNumber(e.target.value);
  let changeSearchString = (e) => setSearchString(e.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    let checkRepeat = persons.some((person) => person.name === newName);
    let checkNumberRepeat = persons.some(
      (person) => person.number === newNumber,
    );
    if (checkRepeat) {
      alert(`${newName} : this name already exists in the phonebook`);
      return;
    } else if (checkNumberRepeat) {
      alert(`${newNumber} : this number already exists in the phonebook`);
      return;
    } else
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
