import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import VolunteerCard from './VolunteerCard';

const VolunteerProfile = ({ volunteerData }) => {
  const router = useRouter();
  const { id } = router.query;

  const [volunteer, setVolunteer] = useState(volunteerData || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    if (id && !volunteerData) {
      axios.get(`http://localhost:8000/volunteer/?id=${id}`)
        .then((response) => {
          setVolunteer(response.data);
          setLoading(false); // Stop loading once data is received
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to load volunteer details');
          setLoading(false); // Stop loading on error
        });
    }
  }, [id, volunteerData]);

  if (loading) {
    return <div className="loading-message">Loading...</div>; // Ensure loading message
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!volunteer) {
    return <div>No volunteer data available</div>;
  }

  // Function to handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <article className="volunteer-profile">
      <header className="profile-header">
        <VolunteerCard volunteer={volunteer} showBio={true} />
        <section className="profile-details">
          {/* Tabs for navigation */}
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => handleTabChange('skills')}
            >
              Skills
            </button>
            <button
              className={`tab-button ${activeTab === 'interests' ? 'active' : ''}`}
              onClick={() => handleTabChange('interests')}
            >
              Interests
            </button>
            <button
              className={`tab-button ${activeTab === 'contributions' ? 'active' : ''}`}
              onClick={() => handleTabChange('contributions')}
            >
              Contributions
            </button>
            <button
              className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => handleTabChange('projects')}
            >
              Projects
            </button>
          </div>

          {/* Conditionally render the content based on the active tab */}
          <div className="tab-content">
            {activeTab === 'skills' && (
              <div className="skills" data-testid="skills-section">
                <h2>Skills</h2>
                {volunteer.skills?.length ? (
                  <ul>
                    {volunteer.skills.map(skill => <li key={skill}>{skill}</li>)}
                  </ul>
                ) : (
                  <p>No skills available</p>
                )}
              </div>
            )}
            {activeTab === 'interests' && (
              <div className="interests" data-testid="interests-section">
                <h2>Interests</h2>
                {volunteer.interests?.length ? (
                  <ul>
                    {volunteer.interests.map(interest => <li key={interest}>{interest}</li>)}
                  </ul>
                ) : (
                  <p>No interests available</p>
                )}
              </div>
            )}
            {activeTab === 'contributions' && (
              <div className="contributions" data-testid="contributions-section">
                <h2>Contributions</h2>
                {volunteer.contributions?.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Community</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteer.contributions.map((contribution, index) => (
                        <tr key={index}>
                          <td>{contribution.projectName}</td>
                          <td>{contribution.community}</td>
                          <td>{contribution.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No contributions available</p>
                )}
              </div>
            )}
            {activeTab === 'projects' && (
              <div className="projects" data-testid="projects-section">
                <h2>Projects</h2>
                {volunteer.projects?.length ? (
                  <ul>
                    {volunteer.projects.map((project, index) => (
                      <li key={index}>{project}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects available</p>
                )}
              </div>
            )}
          </div>
        </section>
      </header>

      <section className="volunteer-sidebar">
        <div className="actions">
          <button className="btn follow">Follow</button>
          <button className="btn message">Message</button>
        </div>
        <section className="followers">
          <h2>Followers</h2>
          <ul className="follower-list">
            {volunteer.followers?.length ? (
              volunteer.followers.map(follower => (
                <li key={follower.id}>
                  <img src={follower.picture || '/default-avatar.png'} alt={follower.name} />
                  <p>{follower.name}</p>
                </li>
              ))
            ) : (
              <p>No followers available</p>
            )}
          </ul>
          <a href="#" className="see-all">See all followers</a>
        </section>
      </section>
    </article>
  );
};

export default VolunteerProfile;
