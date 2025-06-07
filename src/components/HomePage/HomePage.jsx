import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("citizen");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      navigate(userType === "citizen" ? "/login-user" : "/login-company");
    } else {
      navigate(userType === "citizen" ? "/register-user" : "/register-company");
    }
  };

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
        <section className={styles.leftContent}>
          <h1 className={styles.title}>Відбудова України починається з тебе</h1>
          <p className={styles.subtitle}>
            Ми об'єднуємо громадян, компанії та державу для ефективної
            координації відновлення зруйнованої інфраструктури.
          </p>
        </section>

        <section className={styles.rightContent}>
          <div className={styles.formCard}>
            <div className={styles.roleSwitcher}>
              <button
                className={`${styles.switchButton} ${
                  userType === "citizen" ? styles.active : ""
                }`}
                onClick={() => setUserType("citizen")}
              >
                Громадянин
              </button>
              <button
                className={`${styles.switchButton} ${
                  userType === "company" ? styles.active : ""
                }`}
                onClick={() => setUserType("company")}
              >
                Компанія
              </button>
            </div>

            <h2 className={styles.formTitle}>
              {isLogin ? "Увійти" : "Зареєструватися"} як{" "}
              {userType === "citizen" ? "Громадянин" : "Компанія"}
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input type="text" placeholder="Логін" required />
              <input type="password" placeholder="Пароль" required />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Повторіть пароль"
                  required
                />
              )}

              <button type="submit" className={styles.submitButton}>
                {isLogin ? "Увійти" : "Зареєструватися"}
              </button>
            </form>

            <p className={styles.toggleText}>
              {isLogin ? "Не маєш акаунту?" : "Є акаунт?"}
              <span
                className={styles.toggleLink}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Зареєструватися" : " Увійти"}
              </span>
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Rebuild — Платформа відновлення України</p>
      </footer>
    </div>
  );
};

export default HomePage;
