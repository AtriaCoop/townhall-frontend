import React, { useEffect, useState } from 'react';
import styles from '../../styles/header.module.scss';

export default function Header() {
    const [visibleLogos, setVisibleLogos] = useState([]);

    useEffect(() => {
        const logoSequence = [
            { src: '/assets/redLogo.png', delay: 0 },
            { src: '/assets/yellowLogo.png', delay: 1000 },
            { src: '/assets/blueLogo.png', delay: 2000 },
        ];

        logoSequence.forEach((logo, index) => {
            setTimeout(() => {
                setVisibleLogos((prev) => [...prev, logo.src]); // Add each part of the logo after a delay
            }, logo.delay);
        });
    }, []);

    return (
        <div className={styles.header}>
            {visibleLogos.map((logo, index) => (
                <img
                    key={index}
                    src={logo}
                    alt={`Logo part ${index + 1}`}
                    className={styles.logo}
                />
            ))}
        </div>
    );
}
