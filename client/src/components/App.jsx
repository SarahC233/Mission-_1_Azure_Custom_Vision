import React from "react";
import FileUpload from "./FileUpload";
import styles from "./App.module.css";
import logoImage from "../images/turners_logo.png";
import heroImage from "../images/turners_hero.png"; 

const App = () => {
  return (
    <div>
      <header className={styles.header}>
        <h1>
          <img src={logoImage} alt="Logo" /> Car Type Predictor
        </h1>
      </header>
      <img
        className={styles.heroImage}
        src={heroImage} 
        alt="Hero"
      />
      <div className={styles.fileUploadArea}>
        <FileUpload />
      </div>
    </div>
  );
};

export default App;
