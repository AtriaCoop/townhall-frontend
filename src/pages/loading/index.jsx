import React, { useEffect, useState } from 'react';
import styles from '../../styles/loading.module.scss';
import { useRouter } from 'next/router'
import { validatePassword, registerUser } from '../../utils/authHelpers';

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
    const [loading, setLoading] = useState(false);

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

        const validationError = validatePassword(formData.password, formData.confirmPassword);
        if (validationError) {
            setError(validationError);
            return;
        }

        const result = await registerUser(formData);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccessful(result.success);
            setTimeout(() => {
                setShowIndividualScreen(false);
                setShowSignInScreen(true);
            }, 2000);
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                gender: "",
            });
            setError(null);
        }
    };
    
const handleSignIn = async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    setLoading(true);

    try {
        const response = await fetch("http://127.0.0.1:8000/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));  // Store user data

            setTimeout(() => {
                setLoading(false)
                router.push(`/profile`);  // Redirect to user's profile
            }, 1500)

        } else {
            setLoading(false)
            setError(data.error || "Invalid email or password");
        }
    } catch (error) {
        setLoading(false)
        setError("An error occurred while signing in. Please try again.");
    }
};


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
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.signInButton} onClick={handleSignIn} disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}  {/* ✅ Button Text Change */}
                        </button>
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
