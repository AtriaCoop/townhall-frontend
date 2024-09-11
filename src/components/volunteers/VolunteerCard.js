import React from 'react';
import styles from './VolunteerCard.module.scss';

const VolunteerCard = ({ volunteer, showBio = true }) => {
  return (
    <div className={styles.volunteerCard}>
      <div className={styles.volunteerHeader}>
        <img
          src={volunteer.profilePicture || `https://randomuser.me/api/portraits/men/1.jpg`}
          alt={`${volunteer.first_name} ${volunteer.last_name}`}
          className={styles.volunteerCardImg}
        />
        <div className={styles.volunteerInfo}>
          <h3>{volunteer.first_name} {volunteer.last_name}</h3>
          {showBio && <p className={styles.bio}>{volunteer.bio || 'No bio available'}</p>}
          <p className={styles.location}>{volunteer.location || "Location not available"}</p>
        </div>
      </div>
      <div className='volunteer-details'>
        <div className={styles.certificates}>
          <p>Certificates:</p>
          {volunteer.certifications?.length > 0 ? (
            <ul>
              {volunteer.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </div>

        <div className={styles.volunteerRole}>
          <p>Role:</p>
          {volunteer.role && volunteer.organization ? (
            <a href="#">{volunteer.organization}</a>
          ) : (
            <p>Role and organization not available</p>
          )}
        </div>

        <div className={styles.volunteerMemberships}>
          <p>Member of:</p>
          {volunteer.memberships?.length > 0 ? (
            <ul>
              {volunteer.memberships.map((org, index) => (
                <li key={index}>
                  <a href="#">{org}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Not a member of any organization</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;
