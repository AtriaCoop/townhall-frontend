import React, { useEffect, useState } from 'react';
import styles from '../../styles/loading.module.scss';

export default function Loading() {
    const [visibleLogos, setVisibleLogos] = useState([]);
    const [showScreen, setShowScreen] = useState(false); // State to toggle between logo and new screen

    useEffect(() => {
        const logoSequence = [
            { src: '/assets/redLogo.png', delay: 0 },
            { src: '/assets/yellowLogo.png', delay: 750 },
            { src: '/assets/blueLogo.png', delay: 1400 },
        ];

        logoSequence.forEach((logo, index) => {
            setTimeout(() => {
                setVisibleLogos((prev) => [...prev, logo.src]);
            }, logo.delay);
        });

        // After the final logo finishes loading, transition to the new screen
        const totalDuration = logoSequence[logoSequence.length - 1].delay + 1500;
        setTimeout(() => {
            setShowScreen(true);
        }, totalDuration);

        return () => clearTimeout(); // Cleanup
    }, []);

    return (
        <div className={styles.loading}>
            {!showScreen ? (
                // Logo sequence
                visibleLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Logo part ${index + 1}`}
                        className={styles.logo}
                    />
                ))
            ) : (
                // New screen
                <div className={styles.newScreen}>
                    <h1>Are you an individual or organization?</h1>
                    <img src="/assets/logo.png" alt="" />
                    <button className={`${styles.button} ${styles.individualButton}`}>Individual</button>
                    <button className={`${styles.button} ${styles.organizationButton}`}>Organization</button>
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </div>
            )}
        </div>
    );
}
