import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact } from 'redux/store';

export const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  const addNewContact = (id, name, number) => {
    if (
      !contacts.some(elem => elem.name.toLowerCase() === name.toLowerCase())
    ) {
      dispatch(addContact({ id, name, number }));
      setState(prevState => {
        return { ...prevState, name: '', number: ''};
      });
    } else {
      alert(`${name} is already exist! Write another one!`);
    }
  };

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onSubmitHandler = event => {
    event.preventDefault();
    const id = nanoid();
    addNewContact(id, state.name, state.number);
  };

  const onInputChange = event => {
    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={state.name}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onInputChange}
      />
      <label>Number</label>
      <input
        type="tel"
        name="number"
        value={state.number}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onInputChange}
      />
      <button type="submit">Add contact</button>
    </form>
  );
};