// This code defines a React functional component that fetches and displays a list of volunteers. 
// It utilizes React Redux to manage the fetching of data and component state, including loading and error statuses.

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers } from '../store/volunteerSlice';
import VolunteerList from '../components/volunteers/VolunteerList';

export default function VolunteersList() {
  const dispatch = useDispatch();
  const { volunteers, status, error } = useSelector((state) => state.volunteer);
  // useSelector extracts the relevant state properties (volunteers, status, error) from the Redux store.

  useEffect(() => {
    dispatch(fetchVolunteers());
    // useEffect runs once when the component mounts, dispatching an action to fetch volunteers.
  }, [dispatch]);
  // The dependency array ensures fetchVolunteers is only called when the component mounts.

  if (status === 'loading') return <div className="loading-message">Loading...</div>;
  // Conditional rendering: show a loading message while volunteers data is being fetched.

  if (status === 'failed') return <div className="error-message">{error}</div>;
  // Conditional rendering: show an error message if the fetch fails.

  return (
    <section className="volunteer-list-page">
      <h1>Our Volunteers</h1>
      <VolunteerList volunteers={volunteers} />
      {/* Render the VolunteerList component, passing in the volunteers as props. */}
    </section>
  );
}
