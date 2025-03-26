import styles from "../../styles/home.module.scss";
import { useRouter } from "next/router";

export default function HomeContent() {

    const router = useRouter();

  return (
    <div className={styles.homeContent}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1>Connecting Volunteers with Communities</h1>
          <p>
            Welcome to Atria Community! We bridge passionate volunteers with organizations making a difference in Vancouver, BC. Explore opportunities to contribute or find support for your initiatives.
          </p>
          <button className={styles.ctaButton} onClick={() => router.push("/loading")}>Sign up &raquo;</button>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className={`${styles.section} ${styles.volunteer}`}>
        <img
          src="/assets/volunteers.jpg"
          alt="Volunteers engaging in community service"
        />
        <div className={styles.sectionText}>
          <h2>Are you a Volunteer?</h2>
          <p>
            Giving back to your community has never been easier. Atria Community provides tools and resources to help you find meaningful volunteer opportunities in your area.
          </p>
          <button className={styles.ctaButton}>Learn More</button>
        </div>
      </section>

      {/* Organization Section */}
      <section className={`${styles.section} ${styles.organization}`}>
        <div className={styles.sectionText}>
          <h2>Are you an Organization?</h2>
          <p>
            Atria Community connects your not-for-profit or charitable organization with committed, talented individuals who are eager to support your cause.
          </p>
          <button className={styles.ctaButton}>Learn More</button>
        </div>
        <img
          src="/assets/organization.jpg"
          alt="Organization team collaborating"
        />
      </section>

      {/* About Section */}
      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.sectionText}>
          <h2>About Atria Community</h2>
          <p>
            Founded in 2023, Atria Community looks to connect volunteers with organizations across British Columbia, fostering community engagement and support.
          </p>
          <button className={styles.ctaButton}>Learn More</button>
        </div>
        <img
          src="/assets/evan.jpg"
          alt="About Atria Community"
        />
      </section>
    </div>
  );
}
