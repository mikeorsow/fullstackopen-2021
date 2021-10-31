import React, { useEffect, useState } from "react";
import contactService from "./services/contacts";
import "./index.css";

const Notification = ({ message, className }) => {
  if (message === null) {
    return null;
  }
  return <div className={className}>{message}</div>;
};

const Contact = ({ filteredContacts, removeContact }) => {
  return filteredContacts.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}{" "}
      <button onClick={() => removeContact(person.id)}> Remove </button>
    </div>
  ));
};

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Search Contacts:{" "}
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const ContactForm = ({
  tryAddContact,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={tryAddContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      number: <input value={newNumber} onChange={handleNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [notificationClassName, setnotificationClassName] = useState("");

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setContacts(initialContacts);
    });
  }, []);

  const tryAddContact = (event) => {
    event.preventDefault();
    const existingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.toLowerCase().trim()
    );
    if (newName.trim() === "") return alert("Name is required");
    if (newNumber.trim() === "") return alert("Number is required");
    if (existingContact) return updateContact(existingContact);
    else addContact();
  };

  const addContact = () => {
    const maxId = Math.max(contacts.map((contact) => contact.id));
    const contactObject = {
      name: newName,
      number: newNumber,
      id: maxId + 1,
    };
    contactService.create(contactObject).then((response) => {
      setContacts(contacts.concat(contactObject));
      clearInputs();
      setNotificationText(`${newName} was added to your contacts!`);
      setnotificationClassName("success");
      clearNotification(3000);
    });
  };

  const clearNotification = (timeoutMsecs) => {
    setTimeout(() => {
      setNotificationText(null);
    }, timeoutMsecs);
  };

  const clearInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const removeContact = (id) => {
    if (window.confirm("Delete this contact forever?")) {
      contactService.remove(id).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      });
    }
  };

  const updateContact = (existingContact) => {
    const updatedContact = { ...existingContact, number: newNumber };
    if (
      window.confirm(
        `${existingContact.name} already exists. Update this contact?`
      )
    ) {
      contactService
        .update(existingContact.id, updatedContact)
        .then((returnedContact) => {
          setContacts(
            contacts.map((contact) =>
              contact.id !== existingContact.id ? contact : returnedContact
            )
          );
          clearInputs();
        })
        .catch((error) => {
          setNotificationText(
            `Unable to update contact. ${newName} was already deleted.`
          );
          setnotificationClassName("error");
          clearNotification(5000);
          setContacts(
            contacts.filter((contact) => contact.id !== existingContact.id)
          );
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={notificationText}
        className={notificationClassName}
      />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add Contact</h2>
      <ContactForm
        tryAddContact={tryAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Contacts</h2>
      <Contact
        filteredContacts={filteredContacts}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
