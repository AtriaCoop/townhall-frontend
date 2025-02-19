import React, { useState } from "react";
import styles from "../../../styles/navSidebar/sidebarCommunitiesForm.module.scss";
import { Button } from "bootstrap";

const SidebarCommunitiesForm = ({ communities }) => {
    const [selectedOption, setSelectedOption] = useState();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <form>
            {communities.map(name => (
                <div>
                    {selectedOption === name &&
                        <div className={styles.selectedVerticalLine}></div>
                    }
                    <label htmlFor={name} className={selectedOption === name ? styles.selectedSidebarFormButton : styles.sidebarFormButton}>
                        <input 
                            type="radio" 
                            id={name}
                            name={name} 
                            value={name} 
                            checked={selectedOption === name} 
                            onChange={handleChange} 
                        />
                        {name}
                    </label>
                    <br />
                    {selectedOption === name && 
                        <div>
                            <label className={styles.sidebarLinkButton}>
                                Dashboard
                            </label>
                            <label className={styles.sidebarLinkButton}>
                                Ecosystem
                            </label>
                            <label className={styles.sidebarLinkButton}>
                                Strategic Plan
                            </label>
                            <label className={styles.sidebarLinkButton}>
                                Projects
                            </label>
                            <label className={styles.sidebarLinkButton}>
                                Discussions
                            </label>
                            <label className={styles.sidebarLinkButton}>
                                Calendar
                            </label>
                        </div>
                    }
                </div>
            ))}
        </form>
    );
};

export default SidebarCommunitiesForm