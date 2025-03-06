import React, { useEffect, useState } from 'react';
import styles from '../../styles/loading.module.scss';
import { useRouter } from 'next/router'

export default function Loading() {
    const [visibleLogos, setVisibleLogos] = useState([]);
    const [showScreen, setShowScreen] = useState(false); // State to toggle between logo and new screen
    const [showSignInScreen, setShowSignInScreen] = useState(false);
    const [showIndividualScreen, setShowIndividualScreen] = useState(false);
    const [showOrganizationScreen, setShowOrganizationScreen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(null);

    useEffect(() => {
        const logoSequence = [
            { src: '/assets/redLogo.png', delay: 0 },
            { src: '/assets/yellowLogo.png', delay: 750 },
            { src: '/assets/blueLogo.png', delay: 1500 },
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

    // Navigation
    const router = useRouter();

    // Signing up
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 11) {
            setError("Password must be at least 11 characters long");
            return;
        }

        if (!isNaN(formData.password)) {
            setError("Password cannot be entirely numeric");
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        // Split full name into first and last name
        const nameParts = formData.fullName.trim().split(" ");
        if (nameParts.length < 2) {
            setError("Please enter both first and last name.");
            return;
        }
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");
    
        try {
            const response = await fetch("http://127.0.0.1:8000/volunteer/create_volunteer/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: formData.email,
                    password: formData.password,
                    gender: formData.gender,  // assuming you have this field in state
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Success:", data);
                setSuccessful("Account created successfully! Redirecting...");
                setTimeout(() => {
                    setShowIndividualScreen(false);
                    setShowSignInScreen(true);
                }, 2000)
    
                // Reset form fields
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    gender: "",
                });
                setError(null);
            } else {
                const errorData = await response.json();
                // Check if the error is about the email
                if (errorData.email) {
                    setError("The email has already been used.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }
    };
    
    
    const handleSignIn = () => {
        event.preventDefault();
        router.push('/profile');
    }

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
            ) : !showSignInScreen && !showIndividualScreen && !showOrganizationScreen ? (
                // Main screen
                <div className={styles.modal}>
                    <h1 className={styles.modalTitle}>Are you an individual or organization?</h1>
                    <img className={styles.modalLogo} src="/assets/logo.png" alt="App Logo" />
                    <button className={`${styles.button} ${styles.individualButton}`} onClick={() => setShowIndividualScreen(true)}>Individual</button>
                    <button className={`${styles.button} ${styles.organizationButton}`} onClick={() => setShowOrganizationScreen(true)}>Organization</button>
                    <p className={styles.modalFooter}>Already have an account? <a className={styles.signIn} href="#" onClick={(e) => {e.preventDefault(); setShowSignInScreen(true)}}>Sign in</a></p>
                </div>
                
            ) : showSignInScreen ? (

                // Sign in screen
                <div className={styles.formModal}>
                    <h1 className={styles.formModalTitle}>Sign in to your account</h1>
                    <img className={styles.modalLogo} src="/assets/logo.png" alt="App Logo" />
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                        <label htmlFor="email"></label>
                        <input className={styles.email} type="email" id="email" name="email" placeholder="Email Address" />
                        </div>
                        <div className={styles.inputGroup}>
                        <label htmlFor="password"></label>
                        <input className={styles.password} type="password" id="password" name="password" placeholder="Password" />
                        </div>
                        <div className={styles.options}>
                        <div>
                            <input type="checkbox" id="rememberMe" />
                            <label className={styles.rememberMe} htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a className={styles.forgotPw} href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                        </div>
                        <button type="submit" className={styles.signInButton} onClick={handleSignIn}>Sign In</button>
                        <button type="button" className={styles.googleSignInButton}>
                        <img className={styles.googleLogo} src="/assets/googleLogo.png" alt="Google Icon" />
                        Sign in with Google
                        </button>
                    </form>
                        <p className={styles.signInFooter}>
                            Don’t have an account?{' '}
                            <a className={styles.signUp} href="#" onClick={(e) => {e.preventDefault(); setShowScreen(true); setShowSignInScreen(false)}}>Sign up</a>
                        </p>
                </div>

            ) : showIndividualScreen ? (
                // Individual screen
                <div className={styles.formModal}>
                    <h1 className={styles.formModalTitle}>Create an Account</h1>
                    <img className={styles.modalLogo} src="/assets/logo.png" alt="App Logo" />
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="fullName"></label>
                            <input className={styles.email} type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="First & Last Name" required/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email"></label>
                            <input className={styles.password} type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password"></label>
                            <input className={styles.password} type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword"></label>
                            <input className={styles.password} type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required/>
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="gender"></label>
                            <select name="gender" id="gneder" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                        </div>
                        <div className={styles.options}>
                        <div>
                            <input type="checkbox" id="rememberMe" />
                            <label className={styles.rememberMe} htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a className={styles.forgotPw} href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        {successful && <p className={styles.successful}>{successful}</p>} 
                        <button type="submit" className={styles.signInButton}>Sign Up</button>
                    </form>
                        <p className={styles.signInFooter}>
                            Not an individual?{' '}
                            <a className={styles.signUp} href="#" onClick={(e) => {e.preventDefault(); setShowScreen(true); setShowIndividualScreen(false)}}>Sign up as an organization</a>
                        </p>
                </div>
                
            ) : showOrganizationScreen ? (
                // Organization screen
                <div className={styles.formModal}>
                    <h1 className={styles.formModalTitle}>Create an Account</h1>
                    <img className={styles.modalLogo} src="/assets/logo.png" alt="App Logo" />
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                        <label htmlFor="fullName"></label>
                        <input className={styles.email} type="text" id="fullName" name="fullName" placeholder="First & Last Name" />
                        </div>
                        <div className={styles.inputGroup}>
                        <label htmlFor="email"></label>
                        <input className={styles.password} type="email" id="email" name="email" placeholder="Email Address" />
                        </div>
                        <div className={styles.inputGroup}>
                        <label htmlFor="password"></label>
                        <input className={styles.password} type="password" id="password" name="password" placeholder="Password" />
                        </div>
                        <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword"></label>
                        <input className={styles.password} type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
                        </div>
                        <div className={styles.options}>
                        <div>
                            <input type="checkbox" id="rememberMe" />
                            <label className={styles.rememberMe} htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a className={styles.forgotPw} href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
                        </div>
                        <button type="submit" className={styles.signInButton}>Sign Up</button>
                    </form>
                        <p className={styles.signInFooter}>
                            Not an organization?{' '}
                            <a className={styles.signUp} href="#" onClick={(e) => {e.preventDefault(); setShowScreen(true); setShowOrganizationScreen(false)}}>Sign up as an individual</a>
                        </p>
            </div>
            ): null}
        </div>
    );
}
