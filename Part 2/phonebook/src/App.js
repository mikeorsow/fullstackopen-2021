import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const contactList = persons.map(person => <div key={person.name}>{person.name}</div>);
  const tryAddContact = (event) => {
    event.preventDefault()
    console.log(persons)
    persons.find(person => person.name === newName.trim())
    ? alert(`${newName} is already in your contact list`)
    : addContact(event)
  }
  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
       name: newName 
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={tryAddContact}>
        <div>
          name: 
            <input 
              value= {newName}
              onChange={handleNameChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Contacts</h2>
        {contactList}
    </div>
  )
}

export default App