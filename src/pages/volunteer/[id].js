import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function VolunteerProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [volunteer, setVolunteer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the volunteer's data from the backend
      axios.get(`http://localhost:8000/volunteer/?id=${id}`)
        .then((response) => {
          setVolunteer(response.data);
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to load volunteer details');
        });
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{volunteer.first_name} {volunteer.last_name}</h1>
      <p>Email: {volunteer.email}</p>
    </div>
  );
}
