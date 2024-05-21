import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h2>CARS</h2>
        <p>How to Buy</p>
        <p>Sell Your Car</p>
        <p>Finance & Insurance</p>
        <p>Auctions</p>
      </div>
      <div className={styles.column}>
        <h2>INSURANCE</h2>
        <p>Finance Homepage</p>
        <p>Car & Personal Finance</p>
        <p>Loan Calculator</p>
        <p>Insurance Premium Estimate Tool</p>
      </div>
      <div className={styles.column}>
        <h2>SEARCH FOR</h2>
        <p>Cars</p>
        <p>Trucks and Machinery</p>
        <p>Damaged Cars</p>
        <p>Boats and Marine</p>
      </div>
      <div className={styles.column}>
        <h2>ABOUT US</h2>
        <p>Overview</p>
        <p>Turners Careers</p>
        <p>Terms and Conditions</p>
        <p>Privacy Policy</p>
        <p>The Good Oil Blog</p>
      </div>
    </footer>
  );
};

export default Footer;
