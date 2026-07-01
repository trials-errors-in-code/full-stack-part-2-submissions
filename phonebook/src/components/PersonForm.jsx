import React from "react";

const Form = ({ addPerson, newName, changeName, newNumber, changeNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={changeName} />
        <br />
        Number: <input type="text" value={newNumber} onChange={changeNumber} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
