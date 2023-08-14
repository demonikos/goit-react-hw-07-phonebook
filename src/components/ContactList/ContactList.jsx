import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
// import { deleteContact } from 'redux/store';
import { fetchContacts, deleteContact } from 'redux/operations';


export const ContactList = () => {
  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);

  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      {contacts.map(({ id, name, phone }) => (
        <li key={id}>
          {name}: {phone}{' '}
          <button type="button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </>
  );
};
