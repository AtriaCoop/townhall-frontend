import { configureStore } from '@reduxjs/toolkit';
import volunteerReducer from './volunteerSlice';

const store = configureStore({
  reducer: {
    volunteer: volunteerReducer,
  },
});

export default store;
