import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
  return (
    <>
      <div className={css.Container}>
        <h1 className={css.H1}>Phonebook</h1>
        <ContactForm />
        <h2 className={css.H2}>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </>
  );
};