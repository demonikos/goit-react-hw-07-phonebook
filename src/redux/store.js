import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice, filterSlice } from './slices';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export const { filterContacts } = filterSlice.actions;
