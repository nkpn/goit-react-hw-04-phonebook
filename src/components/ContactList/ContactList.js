import React from 'react';
import style from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className={style.Contacts__container}>
      <ul className={style.Contact__list}>
        {contacts.map(contact => {
          return (
            <li key={contact.id} className={style.Contact__item}>
              {contact.name} : {contact.number}
              <button
                type="button"
                onClick={() => {
                  deleteContact(contact.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    PropTypes.array,
  ]),
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
