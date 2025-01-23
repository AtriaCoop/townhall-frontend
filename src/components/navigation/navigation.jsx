import styles from '../../styles/navigation.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navigation}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        {/* Logo */}
        <img src="/assets/logo.png" alt="Atria Logo" className={styles.logo} />

        {/* DESKTOP */}

        {/* Search bar (Desktop Only) */}
        <form className={`d-none d-lg-flex align-items-center position-relative ${styles.searchBar}`}>
          <input
            type="text"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search Atria"
            aria-label="Search"
          />
          <img
            src="/assets/search.png"
            alt="Search Icon"
            className={styles.magnifyGlass}
          />
        </form>

        {/* Desktop Navigation (Desktop Only) */}
        <div className="d-none d-lg-flex justify-content-center flex-grow-1">
          <ul className="navbar-nav gap-4">
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/education-hub">
                Education Hub
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/discovery-centre">
                Discovery Centre
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/calendar">
                Calendar
              </Link>
            </li>
          </ul>
        </div>

          {/* Right-side icons (Desktop Only) */}
          <div className="d-none d-lg-flex align-items-center ms-4">
          <img
            src="/assets/chat.png"
            alt="Messages"
            className={styles.rightSideChatIcon}
          />
          <img
            src="/assets/notification.png"
            alt="Notifications"
            className={styles.rightSideNotiIcon}
          />
          <img
            src="/assets/profilePhoto.png"
            alt="Profile"
            className={styles.rightSideProfileIcon}
          />
        </div>






        {/* MOBILE */}

        {/* Mobile Burger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile dropdown menu */}
        <div
          className={`${styles.navbarCollapse} ${isOpen ? styles.show : ''}`}
          id="navbarNav"
        >
          {/* Search Bar (Mobile Only) */}
          <form className="d-flex align-items-center position-relative mb-3 px-3 mt-2">
            <input
              type="text"
              className={`form-control ${styles.searchInput}`}
              placeholder="Search Atria"
              aria-label="Search"
            />
            <img
              src="/assets/search.png"
              alt="Search Icon"
              className={styles.magnifyGlassMobile}
            />
          </form>

          {/* Navigation Links (Mobile Only) */}
          <ul className="navbar-nav text-center mb-3">
            <li className="nav-item">
              <Link href="/education-hub" className="nav-link" onClick={() => setIsOpen(false)}>Education Hub</Link>
            </li>
            <li className="nav-item">
              <Link href="/discovery-centre" className="nav-link" onClick={() => setIsOpen(false)}>Discovery Centre</Link>
            </li>
            <li className="nav-item">
              <Link href="/calendar" className="nav-link" onClick={() => setIsOpen(false)}>Calendar</Link>
            </li>
          </ul>

          {/* Right-Side Icons (Mobile Only) */}
          <div className="d-flex justify-content-center gap-3 mb-3 align-items-center">
            <img
              src="/assets/chat.png"
              alt="Messages"
              className={styles.rightSideIconMobile}
            />
            <img
              src="/assets/notification.png"
              alt="Notifications"
              className={styles.rightSideIconMobile}
            />
            <img
              src="/assets/profilePhoto.png"
              alt="Profile"
              className={styles.rightSideIconProfileMobile}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
