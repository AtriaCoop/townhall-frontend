import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk to fetch volunteers
export const fetchVolunteers = createAsyncThunk('volunteers/fetchVolunteers', async () => {
  const response = await axios.get('http://localhost:8000/volunteers/');
  return response.data;
});

// Asynchronous thunk to fetch individual volunteer by ID
export const fetchVolunteerById = createAsyncThunk('volunteers/fetchVolunteerById', async (id) => {
  const response = await axios.get(`http://localhost:8000/volunteer/?id=${id}`);
  return response.data;
});

const volunteerSlice = createSlice({
  name: 'volunteers',
  initialState: {
    volunteers: [],
    volunteer: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchVolunteerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVolunteerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.volunteer = action.payload;
      })
      .addCase(fetchVolunteerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default volunteerSlice.reducer;
