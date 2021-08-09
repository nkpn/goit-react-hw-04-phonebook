//* Service
import React, { Component } from 'react';
import notify from 'helpers/Toast';
import { ToastContainer } from 'react-toastify';
import '../index.css';
import { saveToLS } from 'Hooks/useLocalStorage';
import { getFromLS } from 'Hooks/useLocalStorage';
//* Components
import Container from './Container';
import SubmitForm from './SubmitForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  AddContactOnSubmit = data => {
    // const contact = {
    //   name: data.name,
    //   number: data.number,
    //   id: data.id,
    // };

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase(),
      )
    ) {
      notify(data.name);
      return;
    }

    // this.setState(preventState => ({
    //   contacts: [contact, ...preventState.contacts],
    // }));

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, data] };
    });
  };

  deleteContact = data => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== data),
    }));
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    // this.setState({ contacts: getFromLS('contacts') });
    const contacts = localStorage.getItem('contacts');
    const contactsPars = JSON.parse(contacts);
    if (contactsPars) {
      this.setState({ contacts: contactsPars });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      saveToLS('contacts', this.state.contacts);
      // localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter, contacts } = this.state;
    const { deleteContact, onFilter, AddContactOnSubmit } = this;

    return (
      <Container>
        <h1>Phonebook</h1>
        <SubmitForm onSubmit={AddContactOnSubmit} />
        <h1>Contacts</h1>
        <Filter value={filter} onChange={onFilter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          deleteContact={deleteContact}
        />
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
