import React from "react";
import styles from "../../styles/dashboard.module.scss";

export default function OrganizationDashboard() {
    return (
        <div className={styles.dashboardWrapper}>
            <div className={styles.dashboardContainer}>
                {/* Left Main Section */}
                <div className={styles.mainContent}>
                    <div className={styles.organizationInfo}>
                        <img 
                            src="/images/vfjc-logo.png" 
                            alt="Vancouver Food Justice Coalition" 
                            className={styles.logo}
                        />
                        <h1>Vancouver Food Justice Coalition</h1>
                        <p className={styles.subtitle}>Food Security</p>
                    </div>
                    <div className={styles.tabs}>
                        <button>Description</button>
                        <button>Mission</button>
                        <button>Vision</button>
                    </div>
                    <p className={styles.descriptionText}>
                        The Vancouver Food Justice Coalition (VFJC) promotes equitable access to healthy, culturally appropriate food for all Vancouver residents, addressing food security barriers and supporting local food systems through advocacy, education, and engagement.
                    </p>

                    <div className={styles.partnersSection}>
                        <h2>Partners</h2>
                        <div className={styles.partnerLogos}>
                            <img src="/images/partner1.png" alt="Partner 1" />
                            <img src="/images/partner2.png" alt="Partner 2" />
                            <img src="/images/partner3.png" alt="Partner 3" />
                        </div>
                        <button className={styles.seeAllMembers}>See all members</button>
                    </div>

                    <div className={styles.additionalInfo}>
                        <div className={styles.infoTabs}>
                            <button>Strategic Plan</button>
                            <button>Projects</button>
                            <button>Events</button>
                        </div>
                        <p>A Strategic Plan was finalized on August 7th, 2024.</p>
                        <a href="#">See strategic plan here.</a>
                    </div>

                    <div className={styles.recentPosts}>
                        <h2>Recent Posts:</h2>
                        <div className={styles.postCard}>
                            <p><strong>Vancouver Food Justice Coalition</strong> - Food Security</p>
                            <p>Another great day making sandwiches at Union Gospel Mission, with the best team!</p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className={styles.sidebar}>
                    <button className={styles.followButton}>Follow</button>
                    <button className={styles.messageButton}>Message</button>
                    <button className={styles.joinButton}>Join</button>

                    <div className={styles.opportunitiesSection}>
                        <h3>Opportunities:</h3>
                        <ul>
                            <li>The Food Recovery team needs a coordinator.</li>
                            <li>The housing aid team needs support.</li>
                            <li>Help needed at the Trout Lake brunch.</li>
                        </ul>
                    </div>

                    <div className={styles.eventsSection}>
                        <h3>Upcoming Events:</h3>
                        <ul>
                            <li>Bi-Monthly meeting - August 13th</li>
                            <li>Food Recovery Team Meeting - August 25th</li>
                            <li>Full team meeting to prepare for the Christmas tree event</li>
                        </ul>
                    </div>

                    <div className={styles.followersSection}>
                        <h3>Followers:</h3>
                        <ul>
                            <li>Roshni Johri</li>
                            <li>Albert Wong</li>
                            <li>Sarah Reynolds</li>
                            <li><a href="#">See 105 other followers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
