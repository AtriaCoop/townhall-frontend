// This code defines a Redux slice using Redux Toolkit for managing the state of volunteers. 
// It includes asynchronous actions (thunks) to fetch a list of volunteers and a single volunteer by ID from an API, 
// and handles different states of the requests (loading, succeeded, failed) in the Redux state.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk to fetch all volunteers from the API
export const fetchVolunteers = createAsyncThunk('volunteers/fetchVolunteers', async () => {
  const response = await axios.get('http://localhost:8000/volunteers/');
  return response.data;
});

// Asynchronous thunk to fetch a specific volunteer by ID from the API
export const fetchVolunteerById = createAsyncThunk('volunteers/fetchVolunteerById', async (id) => {
  const response = await axios.get(`http://localhost:8000/volunteer/?id=${id}`);
  return response.data;
});

// Creating a Redux slice to manage volunteers' state
const volunteerSlice = createSlice({
  name: 'volunteers',
  initialState: {
    volunteers: [],  // List of all volunteers
    volunteer: null, // A single volunteer object
    status: 'idle',  // Status of the fetch request: idle | loading | succeeded | failed
    error: null,     // Error message if the request fails
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling the different states of fetching volunteers
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = 'loading';  // Set status to loading when the request is pending
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Set status to succeeded when the request is successful
        state.volunteers = action.payload;  // Populate the volunteers array with the fetched data
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = 'failed';  // Set status to failed when the request fails
        state.error = action.error.message;  // Store the error message
      })
      // Handling the different states of fetching a volunteer by ID
      .addCase(fetchVolunteerById.pending, (state) => {
        state.status = 'loading';  // Set status to loading when the request is pending
      })
      .addCase(fetchVolunteerById.fulfilled, (state, action) => {
        state.status = 'succeeded';  // Set status to succeeded when the request is successful
        state.volunteer = action.payload;  // Set the fetched volunteer to the state
      })
      .addCase(fetchVolunteerById.rejected, (state, action) => {
        state.status = 'failed';  // Set status to failed when the request fails
        state.error = action.error.message;  // Store the error message
      });
  },
});

export default volunteerSlice.reducer;
