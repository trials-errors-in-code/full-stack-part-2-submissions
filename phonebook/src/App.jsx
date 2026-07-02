import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import People from "./components/People";
import Search from "./components/Search";
import dataModify from "./services/data";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    console.log("effect");
    dataModify.getAll().then((data) => setPersons(data));
  }, []);

  let changeName = (e) => setNewName(e.target.value);
  let changeNumber = (e) => setNewNumber(e.target.value);
  let changeSearchString = (e) => setSearchString(e.target.value);

  const removePerson = (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) {
      return;
    }
    dataModify.remove(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id)).catch((error) => {
        console.log(error);
        alert(
          `the person with id ${id} has already been removed from the server`,
        );
      });
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    let personAlreadyInData = persons.find((person) => person.name === newName);

    if (personAlreadyInData) {
      if (
        window.confirm(
          `${newName} is already in phonebook, do you want to change the old number with the new one?`,
        )
      ) {
        let id = personAlreadyInData.id;
        let updatedPerson = { ...personAlreadyInData, number: newNumber };
        dataModify.updateNumber(id, updatedPerson).then((data) => {
          setPersons(persons.map((p) => (p.id === id ? data : p)));
        });
        setNewName("");
        setNewNumber("");
      }
      return;
    }
    let newPerson = {
      name: newName,
      number: newNumber,
    };

    dataModify
      .create(newPerson)
      .then((data) => setPersons(persons.concat(data)));

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

      <People
        persons={persons}
        searchString={searchString}
        onDelete={removePerson}
      />
    </div>
  );
};

export default App;
