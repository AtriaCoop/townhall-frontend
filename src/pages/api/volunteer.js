import axiosInstance from './axiosConfig';

export const getVolunteers = async () => {
  try {
    const response = await axiosInstance.get('/volunteers/');
    return response.data;
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};
