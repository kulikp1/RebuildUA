import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>REBUILD</div>
      <nav className={styles.nav}>
        <Link to="/">Головна</Link>
        <Link to="/requests">Всі заявки</Link>
        <Link to="/contacts">Контакти</Link>
      </nav>
    </header>
  );
};

export default Header;
