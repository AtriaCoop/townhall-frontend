import React, { useState } from "react";
import styles from "../../styles/profilePage.module.scss";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("skills");
    const [activeContributionsTab, setActiveContributionsTab] = useState("contributions");

    return (
        <div className={styles.profilePageWrapper}>
            <div className={styles.profilePageContainer}>
                {/* Profile Section */}
                <div className={styles.profileSection}>
                    <div className={styles.profileContainer}>
                        <img 
                            src="/assets/profilePhoto.png" 
                            alt="Evan Sidwell" 
                            className={styles.profilePicture}
                        />
                        <div className={styles.profileInfo}>
                            <h1 className={styles.profileName}>Evan Sidwell</h1>
                            <p className={styles.tagline}>Foodie with a passion for adventure.</p>
                            <p className={styles.location}>Kitsilano Area</p>
                        </div>
                    </div>
                    <p className={styles.certification}>Food Safe Certification Uploaded</p>
                    <p className={styles.communityManager}>Community Manager at: <a href="#">A Better Life Foundation</a></p>

                    <div className={styles.memberOf}>
                        <p>Member of:</p>
                        <ul className={styles.memberList}>
                            <li className={styles.memberItem}>
                                <img src="/assets/profilePhoto.png" alt="Westside Food Collaborative" className={styles.memberLogo} />
                                <a href="#">Westside Food Collaborative</a>
                            </li>
                            <li className={styles.memberItem}>
                                <img src="/assets/profilePhoto.png" alt="Metro Alliance Vancouver" className={styles.memberLogo} />
                                <a href="#">Metro Alliance Vancouver</a>
                            </li>
                            <li className={styles.memberItem}>
                                <img src="/assets/profilePhoto.png" alt="Vancouver Food Justice Coalition" className={styles.memberLogo} />
                                <a href="#">Vancouver Food Justice Coalition</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <button className={styles.editProfileButton}>Edit Profile</button>
                    <button className={styles.shareProfileButton}>Share Profile</button>

                    <h3 className={styles.followersTitle}>Followers:</h3>
                    <div className={styles.followersSection}>
                        <ul className={styles.followersList}>
                            <li><img src="/assets/profilePhoto.png" alt="img" />Roshni Johri</li>
                            <li><img src="/assets/profilePhoto.png" alt="img" />Albert Wong</li>
                            <li><img src="/assets/profilePhoto.png" alt="img" />Sarah Reynolds</li>
                            <li><a href="#">See 105 other followers</a></li>
                        </ul>
                    </div>

                    <button className={styles.impactDashboardButton}>Evan's Impact Dashboard</button>
                </div>

                <div className={styles.mainContentSection}>
                    {/* Skills and Interests Section */}
                    <div className={styles.skillsSection}>
                        <div className={styles.skillsTabs}>
                            <button 
                                className={`${activeTab === "skills" ? styles.activeTab : ""}`} 
                                onClick={() => setActiveTab("skills")}
                            >
                                Skills
                            </button>
                            <button 
                                className={`${activeTab === "interests" ? styles.activeTab : ""}`} 
                                onClick={() => setActiveTab("interests")}
                            >
                                Interests
                            </button>
                        </div>

                        {activeTab === "skills" ? (
                            <div className={styles.skillsList}>
                                <span className={styles.skillItem}>Policy Analysis</span>
                                <span className={styles.skillItem}>Community Engagement</span>
                                <span className={styles.skillItem}>Social Media</span>
                                <span className={styles.skillItem}>Event Facilitation</span>
                                <span className={styles.skillItem}>Public Speaking</span>
                                <span className={styles.skillItem}>Photography</span>
                            </div>
                        ) : (
                            <div className={styles.interestsList}>
                                <span className={styles.interestItem}>Sustainable Living</span>
                                <span className={styles.interestItem}>Food Justice</span>
                                <span className={styles.interestItem}>Urban Gardening</span>
                                <span className={styles.interestItem}>Community Building</span>
                                <span className={styles.interestItem}>Public Policy</span>
                            </div>
                        )}
                    </div>

                    {/* Contributions and Projects Section */}
                    <div className={styles.contributionsSection}>
                        <div className={styles.contributionsTabs}>
                            <button 
                                className={`${activeContributionsTab === "contributions" ? styles.activeTab : ""}`} 
                                onClick={() => setActiveContributionsTab("contributions")}
                            >
                                Contributions
                            </button>
                            <button 
                                className={`${activeContributionsTab === "projects" ? styles.activeTab : ""}`} 
                                onClick={() => setActiveContributionsTab("projects")}
                            >
                                Projects
                            </button>
                        </div>

                        {activeContributionsTab === "contributions" ? (
                            <div className={styles.contributionsList}>
                                <p>Contributions section content goes here...</p>
                            </div>
                        ) : (
                            <table className={styles.projectsTable}>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Community</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Policy Reform</td>
                                        <td>Vancouver Food Justice Coalition</td>
                                        <td>Coordinator</td>
                                    </tr>
                                    <tr>
                                        <td>Soup Kitchen</td>
                                        <td>Metro Alliance Vancouver</td>
                                        <td>Support</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
