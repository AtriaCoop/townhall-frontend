import { useEffect, useState } from 'react';
import { getVolunteers } from './api/volunteer';
import VolunteerList from '../components/volunteers/VolunteerList';

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await getVolunteers();
        setVolunteers(data);
      } catch (err) {
        setError('Failed to fetch volunteers');
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Volunteers</h1>
      <VolunteerList volunteers={volunteers} />
    </div>
  );
}
