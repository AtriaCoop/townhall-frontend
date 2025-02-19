import React from "react";
import styles from "../../../styles/navSidebar/navSidebar.module.scss"
import SidebarCommunitiesForm from "./sidebarCommunitiesForm";

const NavSidebar = () => {
    // In the future this component should make a backend API request to
    // get the Communities of a given User, but for now it will be hard
    // coded as the following array
    const communities = [
        "Westside Food Collaborative",
        "Metro Vancouver Alliance",
        "Vancouver Food Justice Coalition",
    ];
    
    return (
        <div className={styles.navSidebar}>
            <div className={styles.sidebarHeader}>
                MY COMMUNITIES
            </div>
            <SidebarCommunitiesForm communities={communities} />
        </div>
    );
};

export default NavSidebar;