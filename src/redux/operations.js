import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, Notify } from 'notiflix';

axios.defaults.baseURL = 'https://64da7dafe947d30a260b51ea.mockapi.io/';

let isLoading = false;

const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      Loading.hourglass('Loading all contacts...');
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      Loading.remove();
    }
  }
);

const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      isLoading = true;
      const response = await axios.post('/contacts', contact);
      Notify.success(`Contact ${response.data.name} added`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } finally {
      isLoading = false;
    }
  }
);

const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      isLoading = true;
      const response = await axios.delete(`/contacts/${id}`);
      Notify.success(`${response.data.name} deleted`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    } 
    finally {
      isLoading = false;
    }
  }
);

export {fetchContacts, addContact, deleteContact, isLoading};