//* Service
import React, { useState } from 'react';
import notify from 'helpers/Toast';
import { ToastContainer } from 'react-toastify';
import '../index.css';
import useLocalStorage from 'Hooks/useLocalStorage';
//* Components
import Container from './Container';
import SubmitForm from './SubmitForm';
import ContactList from './ContactList';
import Filter from './Filter';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', '');
  const [filter, setFilter] = useState('');

  const AddContactOnSubmit = newContact => {
    console.log(contacts);

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
      )
    ) {
      notify(newContact.name);
      return;
    }

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = data => {
    setContacts(contacts.filter(contact => contact.id !== data));
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== data),
    // }));
  };

  const onFilter = evt => {
    setFilter(evt.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <SubmitForm onSubmit={AddContactOnSubmit} />
      <h1>Contacts</h1>
      <Filter value={filter} onChange={onFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
}

export default App;
