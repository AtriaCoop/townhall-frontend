export default function VolunteerProfile({ volunteer }) {
  if (!volunteer) {
    return <p>Volunteer not found</p>;
  }

  return (
    <div>
      <h1>{volunteer.first_name} {volunteer.last_name}</h1>
      <p>Email: {volunteer.email}</p>
      <h2>Opportunities</h2>
      <ul>
        {volunteer.opportunities?.map((opportunity) => (
          <li key={opportunity.id}>
            {opportunity.title} - {new Date(opportunity.start_time).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
