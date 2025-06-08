import React from "react";
import styles from "./UserPage.module.css";

const UserPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ласкаво просимо, Громадянине!</h1>
      <p className={styles.subtitle}>
        Це ваша особиста сторінка на платформі REBUILD.
      </p>
    </div>
  );
};

export default UserPage;
