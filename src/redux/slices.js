import { createSlice } from '@reduxjs/toolkit';
// import { contactsInitialState, filterInitialState } from './initial';
// import { filterInitialState } from './initial';
import { addContact, deleteContact, fetchContacts } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  // handlePending(false);
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: (state, action) => {
      // handlePending(false);
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,

    [addContact.pending]: handlePending,
    [addContact.fulfilled]: (state, action) => {
      // handlePending(false);
      state.isLoading = false;
      state.items.push(action.payload);
    },
    [addContact.rejected]: handleRejected,

    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: (state, action) => {
      // handlePending(false);
      state.isLoading = false;
      state.items = state.items.filter(
        contact => contact.id !== action.payload.id
      );
    },
    [deleteContact.rejected]: handleRejected,
  },
});

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: contactsInitialState,
//   reducers: {
//     addContact: (state, action) => {
//       state.value.push(action.payload);
//     },
//     deleteContact: (state, action) => {
//       state.value = state.value.filter(
//         contact => contact.id !== action.payload
//       );
//     },
//   },
// });


export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: ''
  },
  reducers: {
    filterContacts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// export const filterSlice = createSlice({
//   name: 'filter',
//   initialState: filterInitialState,
//   reducers: {
//     filterContacts: (state, action) => {
//       state.value = action.payload;
//     },
//   },
// });
