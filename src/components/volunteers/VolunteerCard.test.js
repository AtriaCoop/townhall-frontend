import React from 'react';
import { render, screen } from '@testing-library/react';
import VolunteerCard from './VolunteerCard';

describe('VolunteerCard', () => {
  const defaultVolunteer = {
    first_name: 'John',
    last_name: 'Doe',
    profilePicture: '',
    bio: 'Experienced volunteer',
    location: 'New York, USA',
    certifications: ['CPR Certified', 'First Aid'],
    role: 'Volunteer Coordinator',
    organization: 'Helping Hands',
    memberships: ['Red Cross', 'Habitat for Humanity']
  };

  it('renders the volunteer\'s name, bio, and location correctly', () => {
    // ARRANGE: Render the VolunteerCard with default volunteer data
    render(<VolunteerCard volunteer={defaultVolunteer} />);

    // ASSERT: Ensure the name, bio, and location are displayed correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Experienced volunteer')).toBeInTheDocument();
    expect(screen.getByText('New York, USA')).toBeInTheDocument();
  });

  it('displays "No bio available" when bio is missing and showBio is true', () => {
    // ARRANGE: Modify volunteer data to have no bio, and render with showBio set to true
    const volunteerWithoutBio = { ...defaultVolunteer, bio: '' };
    render(<VolunteerCard volunteer={volunteerWithoutBio} showBio={true} />);

    // ASSERT: Ensure the placeholder for missing bio is displayed
    expect(screen.getByText('No bio available')).toBeInTheDocument();
  });

  it('does not display bio section when showBio is false', () => {
    // ARRANGE: Render the VolunteerCard with showBio set to false
    render(<VolunteerCard volunteer={defaultVolunteer} showBio={false} />);

    // ASSERT: Ensure the bio is not displayed when showBio is false
    expect(screen.queryByText('Experienced volunteer')).toBeNull();
    expect(screen.queryByText('No bio available')).toBeNull();
  });

  it('displays "Location not available" when location is missing', () => {
    // ARRANGE: Modify volunteer data to have no location, and render the card
    const volunteerWithoutLocation = { ...defaultVolunteer, location: '' };
    render(<VolunteerCard volunteer={volunteerWithoutLocation} />);

    // ASSERT: Ensure the placeholder for missing location is displayed
    expect(screen.getByText('Location not available')).toBeInTheDocument();
  });

  it('displays certifications when available', () => {
    // ARRANGE: Render the VolunteerCard with default volunteer data
    render(<VolunteerCard volunteer={defaultVolunteer} />);

    // ASSERT: Ensure certifications are displayed
    expect(screen.getByText('CPR Certified')).toBeInTheDocument();
    expect(screen.getByText('First Aid')).toBeInTheDocument();
  });

  it('does not display the certification section when none are available', () => {
    // ARRANGE: Modify volunteer data to have no certifications, and render the card
    const volunteerWithoutCertifications = { ...defaultVolunteer, certifications: [] };
    render(<VolunteerCard volunteer={volunteerWithoutCertifications} />);

    // ASSERT: Ensure the certification section is present but no certifications are listed
    expect(screen.getByText('Certificates:')).toBeInTheDocument();
    expect(screen.queryByText('CPR Certified')).toBeNull();
  });

  it('displays role and organization when available', () => {
    // ARRANGE: Render the VolunteerCard with default volunteer data
    render(<VolunteerCard volunteer={defaultVolunteer} />);

    // ASSERT: Ensure the role and organization are displayed
    expect(screen.getByText('Helping Hands')).toBeInTheDocument();
  });

  it('displays "Role and organization not available" when role or organization is missing', () => {
    // ARRANGE: Modify volunteer data to have no role and organization, and render the card
    const volunteerWithoutRoleAndOrg = { ...defaultVolunteer, role: '', organization: '' };
    render(<VolunteerCard volunteer={volunteerWithoutRoleAndOrg} />);

    // ASSERT: Ensure the placeholder for missing role and organization is displayed
    expect(screen.getByText('Role and organization not available')).toBeInTheDocument();
  });

  it('displays memberships when available', () => {
    // ARRANGE: Render the VolunteerCard with default volunteer data
    render(<VolunteerCard volunteer={defaultVolunteer} />);

    // ASSERT: Ensure memberships are displayed
    expect(screen.getByText('Red Cross')).toBeInTheDocument();
    expect(screen.getByText('Habitat for Humanity')).toBeInTheDocument();
  });

  it('displays "Not a member of any organization" when no memberships are available', () => {
    // ARRANGE: Modify volunteer data to have no memberships, and render the card
    const volunteerWithoutMemberships = { ...defaultVolunteer, memberships: [] };
    render(<VolunteerCard volunteer={volunteerWithoutMemberships} />);

    // ASSERT: Ensure the placeholder for missing memberships is displayed
    expect(screen.getByText('Not a member of any organization')).toBeInTheDocument();
  });

  it('uses default profile picture when none is provided', () => {
    // ARRANGE: Modify volunteer data to have no profile picture, and render the card
    const volunteerWithoutProfilePicture = { ...defaultVolunteer, profilePicture: '' };
    render(<VolunteerCard volunteer={volunteerWithoutProfilePicture} />);

    // ASSERT: Ensure the default profile picture URL is used
    const imgElement = screen.getByAltText('John Doe');
    expect(imgElement.src).toContain('https://randomuser.me/api/portraits/men/1.jpg');
  });
});
