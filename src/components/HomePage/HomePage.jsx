import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>REBUILD</div>
        <nav className={styles.nav}>
          <a href="#">Головна</a>
          <a href="#">Про нас</a>
          <a href="#">Контакти</a>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>Допомагаємо відновлювати життя</h1>
          <p className={styles.subtitle}>
            Сервіс координації зусиль для громадян, компаній та держави у
            ліквідації наслідків руйнувань. Заявки. Звіти. Відновлення.
          </p>
          <button className={styles.ctaButton}>Подати заявку</button>
        </div>
        <div className={styles.sliderPreview}>
          <div className={styles.slide}>
            <span className={styles.slideNumber}>01</span>
            <h3>Подайте заявку з геолокацією</h3>
          </div>
          <div className={styles.slide}>
            <span className={styles.slideNumber}>02</span>
            <h3>Компанії отримують завдання</h3>
          </div>
          <div className={styles.slide}>
            <span className={styles.slideNumber}>03</span>
            <h3>Ви отримуєте результат і звіт</h3>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Rebuild. Всі права захищено.</p>
      </footer>
    </div>
  );
};

export default HomePage;
