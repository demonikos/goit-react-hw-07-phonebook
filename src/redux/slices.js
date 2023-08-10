import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState, filterInitialState } from './initial';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: (state, action) => {
      state.value.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.value = state.value.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    filterContacts: (state, action) => {
      state.value = action.payload;
    },
  },
});
