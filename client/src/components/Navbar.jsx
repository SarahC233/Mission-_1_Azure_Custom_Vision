import React from "react";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItem}>
        <FontAwesomeIcon icon={faSearch} />
        <span>Find a Car</span>
      </div>
      <div className={styles.navItem}>How to Buy</div>
      <div className={styles.navItem}>Sell your Car</div>
      <div className={styles.navItem}>Finance and Insurance</div>
      <div className={styles.navItem}>Turners Subscription</div>
      <div className={styles.navItemSpacer} />
      <div className={styles.navItem}>Auctions</div>
      <div className={styles.navItem}>Services & Info</div>
    </nav>
  );
};

export default Navbar;
