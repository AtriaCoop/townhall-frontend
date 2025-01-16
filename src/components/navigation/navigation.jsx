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

        {/* Search bar (Desktop Only) */}
        <form className="d-none d-lg-flex align-items-center position-relative" style={{ maxWidth: '200px', minWidth: '200px', flex: '1', marginLeft: '2rem' }}>
          <input
            type="text"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search Atria"
            aria-label="Search"
            style={{ paddingLeft: '2.5rem' }}
          />
          <img
            src="/assets/search.png"
            alt="Search Icon"
            className="position-absolute"
            style={{
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              pointerEvents: 'none',
            }}
          />
        </form>

        {/* Desktop Navigation Items */}
        <div className="d-none d-lg-flex justify-content-center flex-grow-1">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link href="/education-hub" className="nav-link" style={{ backgroundColor: '#01617B', color: '#FFF', padding: '10px 25px', borderRadius: '5px' }}>
                Education Hub
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/discovery-centre" className="nav-link" style={{ backgroundColor: '#01617B', color: '#FFF', padding: '10px 25px', borderRadius: '5px' }}>
                Discovery Centre
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/calendar" className="nav-link" style={{ backgroundColor: '#01617B', color: '#FFF', padding: '10px 25px', borderRadius: '5px' }}>
                Calendar
              </Link>
            </li>
          </ul>
        </div>

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
          {/* Search Bar */}
          <form className="d-flex align-items-center position-relative mb-3 px-3 mt-2">
            <input
              type="text"
              className={`form-control ${styles.searchInput}`}
              placeholder="Search Atria"
              aria-label="Search"
              style={{ paddingLeft: '2.5rem' }}
            />
            <img
              src="/assets/search.png"
              alt="Search Icon"
              className="position-absolute"
              style={{
                left: '25px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                pointerEvents: 'none',
              }}
            />
          </form>

          {/* Navigation Links */}
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

          {/* Right-Side Icons */}
          <div className="d-flex justify-content-center gap-3 mb-3">
            <img
              src="/assets/chat.png"
              alt="Messages"
              style={{ width: '30px', height: '30px' }}
            />
            <img
              src="/assets/notification.png"
              alt="Notifications"
              style={{ width: '30px', height: '30px' }}
            />
            <img
              src="/assets/profilePicture.png"
              alt="Profile"
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
          </div>
        </div>

        {/* Right-side icons (Desktop Only) */}
        <div className="d-none d-lg-flex align-items-center ms-4">
          <img
            src="/assets/chat.png"
            alt="Messages"
            style={{ width: '30px', height: '30px', marginRight: '20px' }}
          />
          <img
            src="/assets/notification.png"
            alt="Notifications"
            style={{ width: '30px', height: '30px', marginRight: '20px' }}
          />
          <img
            src="/assets/profilePicture.png"
            alt="Profile"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </div>
      </div>
    </nav>
  );
}
