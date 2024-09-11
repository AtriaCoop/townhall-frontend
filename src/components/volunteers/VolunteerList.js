// This React component, VolunteerList, takes a list of volunteers as a prop and maps through them, 
// rendering each volunteer in a VolunteerCard component. The VolunteerCard component is used to display 
// individual volunteer information, and the 'showBio' prop is set to 'false' for each card.

import React from 'react';
import VolunteerCard from './VolunteerCard';

const VolunteerList = ({ volunteers }) => {
  return (
    <ul className="volunteer-list">
      {volunteers.map((volunteer) => (
        // Each volunteer is rendered as a list item, using the volunteer's ID as the key
        <li key={volunteer.id}>
          {/* The VolunteerCard component is used to display each volunteer, with 'showBio' set to false */}
          <VolunteerCard volunteer={volunteer} showBio={false} />
        </li>
      ))}
    </ul>
  );
};

export default VolunteerList;
