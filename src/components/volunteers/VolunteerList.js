import React from 'react';
import VolunteerCard from './VolunteerCard';

const VolunteerList = ({ volunteers }) => {
  return (
    <ul className="volunteer-list">
      {volunteers.map((volunteer) => (
        <li key={volunteer.id}>
          <VolunteerCard volunteer={volunteer} showBio={false} />
        </li>
      ))}
    </ul>
  );
};

export default VolunteerList;
