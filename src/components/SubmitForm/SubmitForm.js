import React, { useState } from 'react';
import s from './SubmitForm.module.css';
import shortid from 'shortid';
import PropTypes from 'prop-types';

function SubmitForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');
  const uniqeID = shortid();

  const handleInputChange = event => {
    const { name, value, id } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }

    setId(id);
  };

  const handleSubmit = event => {
    event.preventDefault();

    //* Передаем в пропс чтоб прочитать в App
    onSubmit({ id, number, name });
    reset();
  };

  const reset = () => {
    switch (name) {
      case 'name':
        setName('');
        break;

      case 'number':
        setNumber('');
        break;

      case 'id':
        setId('');
        break;

      default:
        return;
    }
  };

  return (
    <>
      <div className={s.Div}>
        <form className={s.Form} onSubmit={handleSubmit}>
          <label className={s.Label} htmlFor={uniqeID}>
            Name
            <input
              type="text"
              name="name"
              className={s.Input}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={name}
              onChange={handleInputChange}
              id={shortid()}
            />
          </label>
          <label className={s.Label}>
            Number
            <input
              type="tel"
              className={s.Input}
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              onChange={handleInputChange}
              value={number}
              id={shortid()}
            />
          </label>
          <button type="submit" className={s.Button}>
            Add to contacts
          </button>
        </form>
      </div>
    </>
  );
}

SubmitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SubmitForm;
