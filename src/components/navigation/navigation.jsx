import styles from '../../styles/navigation.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-transparent ${styles.navigation}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1 className={`${styles.logo} navbar-brand`}>Atria</h1>

        {/* Burger menu (for mobile) */}
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

        {/* Navigation links for mobile */}
        <div
          className={`${styles.navbarCollapse} ${isOpen ? styles.show : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/opportunity" className="nav-link">Opportunities</Link>
            </li>
            <li className="nav-item">
              <Link href="/community" className="nav-link">Communities</Link>
            </li>
            <li className="nav-item">
              <Link href="/event" className="nav-link">Events</Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className="nav-link">My Profile</Link>
            </li>
          </ul>
        </div>

        {/* Desktop menu (hidden in mobile) */}
        <div className="d-none d-lg-flex">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/opportunity" className="nav-link">Opportunities</Link>
            </li>
            <li className="nav-item">
              <Link href="/community" className="nav-link">Communities</Link>
            </li>
            <li className="nav-item">
              <Link href="/event" className="nav-link">Events</Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className="nav-link">My Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
