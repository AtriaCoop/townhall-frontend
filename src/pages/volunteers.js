import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers } from '../store/volunteerSlice';
import VolunteerList from '../components/volunteers/VolunteerList';

export default function VolunteersList() {
  const dispatch = useDispatch();
  const { volunteers, status, error } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  if (status === 'loading') return <div className="loading-message">Loading...</div>;
  if (status === 'failed') return <div className="error-message">{error}</div>;

  return (
    <section className="volunteer-list-page">
      <h1>Our Volunteers</h1>
      <VolunteerList volunteers={volunteers} />
    </section>
  );
}
