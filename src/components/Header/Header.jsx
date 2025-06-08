import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>REBUILD</div>
      <nav className={styles.nav}>
        <a href="#">Головна</a>
        <a href="#">Про нас</a>
        <a href="#">Контакти</a>
      </nav>
    </header>
  );
};

export default Header;
