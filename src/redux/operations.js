import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, Notify } from 'notiflix';

axios.defaults.baseURL = 'https://64da7dafe947d30a260b51ea.mockapi.io/';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      Loading.hourglass('Loading all contacts...');
      const response = await axios.get('/contacts');
      Loading.remove();
      return response.data;
    } catch (error) {
      Loading.remove();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      Loading.hourglass('Adding new contact...');
      const response = await axios.post('/contacts', contact);
      Loading.remove();
      Notify.success(`${response.data.name} added`);
      return response.data;
    } catch (error) {
      Loading.remove();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      Loading.hourglass('Deleting contact...');
      const response = await axios.delete(`/contacts/${id}`);
      Loading.remove();
      Notify.success(`${response.data.name} deleted`);
      return response.data;
    } catch (error) {
      Loading.remove();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
