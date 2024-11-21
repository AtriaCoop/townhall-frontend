// This code imports the 'VolunteerProfile' component from a specific directory and 
// uses it within the 'VolunteerPage' function to render a volunteer profile page.
// This is a simple functional component that returns the 'VolunteerProfile' component as its output.

import VolunteerProfile from '../../components/volunteers/VolunteerProfile';

export default function VolunteerPage() {
  return <VolunteerProfile />;
}
