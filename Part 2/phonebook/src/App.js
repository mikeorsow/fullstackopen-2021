import React, { useEffect, useState } from 'react'
import contactService from './services/contacts'

const Contact = ( {filteredContacts} ) => {
  return (
    filteredContacts.map(person => <div key={person.id}> {person.name} {person.number}</div>)
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
  const [contacts, setContacts] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  
  useEffect( () => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContacts(initialContacts)
      })
  }, [])

  const tryAddContact = (event) => {
    event.preventDefault()
    newName.trim() === '' 
      ? alert('Name is required')
      : contacts.find(contact => contact.name.toLowerCase() === newName.toLowerCase().trim())
      ? alert(`${newName} is already in your contact list`)
      : newNumber.trim() === ''
      ? alert('Number is required')
      : addContact()
  }
  const addContact = () => {
    const contactObject = {
       name: newName,
       number: newNumber,
       id: contacts.length + 1
    }
    setContacts(contacts.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

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