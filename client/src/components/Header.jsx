import React from "react";
import styles from "./Header.module.css";
import logoImage from "../images/turners_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logoImage} alt="Logo" />
      <div className={styles.rightHeader}>
        <div className={styles.loginRegister}>
          <FontAwesomeIcon icon={faUser} />
          <span>LOGIN OR REGISTER</span>
        </div>
        <div className={styles.phone}>
          <FontAwesomeIcon icon={faPhone} />
          <span>0800 887 637</span>
        </div>
        <div className={styles.findUs}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>Find Us</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
