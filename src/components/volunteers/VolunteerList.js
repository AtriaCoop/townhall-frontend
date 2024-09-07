import axios from 'axios';
import { useState, useEffect } from 'react';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/volunteers/');
        setVolunteers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {volunteers.map((volunteer) => (
        <li key={volunteer.id}>
          {volunteer.first_name} {volunteer.last_name}
        </li>
      ))}
    </ul>
  );
};

export default VolunteerList;
