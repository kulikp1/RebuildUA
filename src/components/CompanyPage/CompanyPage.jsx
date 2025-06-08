import React from "react";
import styles from "./CompanyPage.module.css";

const CompanyPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ласкаво просимо, Компаніє!</h1>
      <p className={styles.subtitle}>
        Це ваша компанійська панель платформи REBUILD.
      </p>
    </div>
  );
};

export default CompanyPage;
