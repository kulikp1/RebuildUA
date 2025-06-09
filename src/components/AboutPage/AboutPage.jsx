import React from "react";
import styles from "./AboutPage.module.css";
import Header from "../Header/Header";

const AboutPage = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContentWrapper}>
          <div className={styles.leftTitle}>
            <h1>REBUILD</h1>
            <p className={styles.subtitle}>Відновлюємо Україну разом</p>
          </div>

          <div className={styles.rightContent}>
            <p>
              Цей додаток створено для підтримки людей, чиє житло або бізнес
              постраждали внаслідок військових дій. Ми прагнемо забезпечити
              ефективну комунікацію між тими, хто потребує допомоги, та тими,
              хто може її надати.
            </p>
            <p>
              Платформа об'єднує власників пошкоджених об'єктів, волонтерів,
              будівельні компанії та меценатів. Разом ми формуємо міцну мережу
              для координації дій і ресурсів.
            </p>
            <p>
              Наша ціль — відновити Україну: будинки, школи, лікарні,
              підприємства, інфраструктуру. І головне — повернути людям надію.
            </p>
            <p className={styles.slogan}>
              Разом ми можемо більше. Долучайтесь!
            </p>

            <button onClick={handleBack} className={styles.backButton}>
              Повернутися
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
