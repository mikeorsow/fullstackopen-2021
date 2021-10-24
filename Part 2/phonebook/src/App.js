import React, { useState } from 'react'

const Contact = ( {filteredContacts} ) => {
  return (
    filteredContacts.map(person => <div key={person.name}> {person.name} {person.number}</div>)
  )
}

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
        Search Contacts: <input 
          value={searchTerm}
          onChange={handleSearchChange}
        />
    </div>
  )
}

const ContactForm = ({ tryAddContact, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={tryAddContact}>
    <div>
      name: <input 
        value={newName}
        onChange={handleNameChange}
      />
    </div>
      number: <input 
        value={newNumber}
        onChange={handleNumberChange}
      />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const tryAddContact = (event) => {
    event.preventDefault()
    newName.trim() === '' 
      ? alert('Name is required')
      : persons.find(person => person.name.toLowerCase() === newName.toLowerCase().trim())
      ? alert(`${newName} is already in your contact list`)
      : newNumber.trim() === ''
      ? alert('Number is required')
      : addContact()
  }
  const addContact = () => {
    const personObject = {
       name: newName,
       number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const filteredContacts = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add Contact</h2>
      <ContactForm tryAddContact={tryAddContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Contacts</h2>
      <Contact filteredContacts={filteredContacts} />
    </div>
  )
}

export default App