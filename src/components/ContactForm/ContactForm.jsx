import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { addContact, isLoading } from 'redux/operations';
import { Notify } from 'notiflix';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import css from './ContactForm.module.css';
import { TextField } from '@mui/material';

const nameExp = new RegExp(
  "^[a-zA-Za-яА-Я]+(([' ]?[ a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
);
const phoneExp = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$');

export const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    phone: '',
  });

  const load = isLoading;

  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  const addNewContact = (id, name, phone) => {
    if (
      !contacts.some(elem => elem.name.toLowerCase() === name.toLowerCase())
    ) {
      dispatch(addContact({ id, name, phone }));
      setState(prevState => {
        return { ...prevState, name: '', phone: '' };
      });
    } else {
      Notify.info(`Contact ${name} is already exist! Write another one!`);
    }
  };

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onSubmitHandler = event => {
    event.preventDefault();
    if (!event.target.elements.name.value.match(nameExp)) {
      Notify.failure(
        `Wrong value. Name may contain only letters, apostrophe, dash and spaces.`
      );
      return;
    }

    if (!event.target.elements.phone.value.match(phoneExp)) {
      Notify.failure(
        `Wrong value. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +.`
      );
      return;
    }

    const id = nanoid();
    addNewContact(id, state.name, state.phone);
  };

  const onInputChange = event => {

if (event.target.name === 'phone' && event.target.value.length > 16){
  Notify.failure('Too much signs in number. Please, check the inputed value');
return
}

    setState(prevState => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  return (
    <form className={css.Form} onSubmit={onSubmitHandler}>
      {/* <label className= {css.Label}>Contact's name</label> */}
      {/* <input
        type="text"
        name="name"
        value={state.name}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onInputChange}
      />
      {/* <label className= {css.Label}>Phone number</label> */}
      {/* <input
        type="tel"
        name="phone"
        value={state.phone}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onInputChange}
      /> */}
      {/* <button className = {css.Button} type="submit">Add contact</button> */}
      {/* <button className = {css.Button} type="submit">Add contact</button> */}

      <TextField
        id="outlined-basic"
        type="text"
        name="name"
        label="Name"
        variant="outlined"
        value={state.name}
        // inputProps={namePattern}
        // pattern="^[a-zA-Za-яА-Я]+(([' \-][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
        pattern={nameExp}
        title="Name may contain only letters, apostrophe, dash and spaces."
        required
        onChange={onInputChange}
      />
      <TextField
        id="outlined-basic"
        type="tel"
        name="phone"
        label="Phone number"
        variant="outlined"
        value={state.phone.trim()}
        // inputProps={telPattern}
        // pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        pattern={phoneExp}
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={onInputChange}
      />

      <LoadingButton
        className = {css.Button}
        type="submit"
        color="primary"
        onSubmit={onSubmitHandler}
        loading={load}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        <span>Save</span>
      </LoadingButton>
    </form>
  );
};
