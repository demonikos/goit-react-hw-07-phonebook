import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { fetchContacts, deleteContact, isLoading } from 'redux/operations';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import css from './ContactList.module.css';

import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const ContactList = () => {
  const load = isLoading;

  const dispatch = useDispatch();
  const filterRedux = useSelector(getFilter);
  const contactRedux = useSelector(getContacts);
  const contacts = filterRedux === '' ? contactRedux : filteredNames();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function filteredNames() {
    return contactRedux.filter(elem =>
      elem.name.toLowerCase().includes(filterRedux)
    );
  }

  const onDelete = id => {
    dispatch(deleteContact(id));
    console.log(load);
  };

  // const onSubmitHandler = event => {
  //   event.preventDefault();
  //   const onDelete = (id) => {
  //     dispatch(deleteContact(id));
  //     console.log(load)
  //   };
  //   onDelete()
  // };

  return (
    <>
      {/* <ul className={css.List}> */}
      {/* <List sx={{ width: '100%', maxWidth: 480}}> */}
      <div className={css.List}>
        <List sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
          {contacts.map(({ id, name, phone }) => (
            // <li key={id}>
            //   {name}: {phone}{' '}
            //   {/* <button type="button" onClick={() => onDelete(id)}>
            //     Delete
            //   </button> */}
            //   {/* <IconButton
            //     aria-label="delete"
            //     color="primary"
            //     onClick={() => onDelete(id)}
            //   >
            //     <DeleteIcon />
            //   </IconButton> */}

            // </li>

            // <div>
            <ListItem key={id} className={css.ListItem}>
              {/* <> */}
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon color="primary" htmlColor='secondary'/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={phone}
                sx={{ width: 184, maxWidth: 184 }}
              />
              {/* </> */}
              <LoadingButton
                sx={{ width: '100px', minWidth: '100px' }}
                color="primary"
                onClick={() => onDelete(id)}
                loading={load}
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                variant="contained"
              >
                <span>Remove</span>
              </LoadingButton>
            </ListItem>
            // </div>
          ))}
          {/* </ul> */}
        </List>
      </div>
    </>
  );
};
