// This module is responsible for fetching volunteer data from an API using an Axios instance. 
// It exports an asynchronous function that makes a GET request to retrieve volunteer information 
// and handles any potential errors during the request.

import axiosInstance from './axiosConfig'; // Importing a pre-configured Axios instance for making HTTP requests

// Function to get volunteers' data from the API
export const getVolunteers = async () => {
  try {
    // Making a GET request to the '/volunteers/' endpoint to fetch volunteer data
    const response = await axiosInstance.get('/volunteers/');
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};
