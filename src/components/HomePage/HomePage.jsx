import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("citizen");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const [validation, setValidation] = useState({
    emailValid: false,
    passwordValid: false,
    emailTaken: false,
    passwordsMatch: false,
  });

  const isEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!formData.login || !isEmail(formData.login)) return;

      try {
        const res = await fetch(
          `https://6844cf88fc51878754d9e305.mockapi.io/users?login=${formData.login}`
        );
        const users = await res.json();
        setValidation((prev) => ({
          ...prev,
          emailTaken: users.length > 0,
        }));
      } catch (err) {
        console.error("Помилка при перевірці email", err);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [formData.login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    setValidation((prev) => ({
      ...prev,
      emailValid: isEmail(updated.login),
      passwordValid: updated.password.length >= 5,
      passwordsMatch: updated.password === updated.repeatPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validation.emailValid) {
      setError("Невірний формат email");
      return;
    }

    if (!validation.passwordValid) {
      setError("Пароль повинен містити щонайменше 5 символів");
      return;
    }

    if (!isLogin && !validation.passwordsMatch) {
      setError("Паролі не збігаються");
      return;
    }

    if (!isLogin && validation.emailTaken) {
      setError("Такий email вже зареєстрований");
      return;
    }

    if (isLogin) {
      navigate(userType === "citizen" ? "/login-user" : "/login-company");
    } else {
      try {
        const payload = {
          login: formData.login,
          password: formData.password,
          role: userType === "citizen" ? "user" : "company",
        };

        const response = await fetch(
          "https://6844cf88fc51878754d9e305.mockapi.io/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) throw new Error("Registration failed");

        navigate(userType === "citizen" ? "/userPage" : "/companyPage");
      } catch (err) {
        console.error(err);
        setError("Помилка при реєстрації. Спробуйте пізніше.");
      }
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
        <motion.section
          className={styles.leftContent}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className={styles.title}>Відбудова України починається з тебе</h1>
          <p className={styles.subtitle}>
            Ми об'єднуємо громадян, компанії та державу для ефективної
            координації відновлення зруйнованої інфраструктури.
          </p>
        </motion.section>

        <motion.section
          className={styles.rightContent}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
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
              <input
                name="login"
                type="text"
                placeholder="Email"
                value={formData.login}
                onChange={handleChange}
                required
              />
              {formData.login && !validation.emailValid && (
                <small style={{ color: "red" }}>Некоректний формат email</small>
              )}
              {!isLogin && validation.emailTaken && (
                <small style={{ color: "red" }}>Email вже зареєстровано</small>
              )}

              <input
                name="password"
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formData.password && !validation.passwordValid && (
                <small style={{ color: "red" }}>
                  Пароль повинен містити щонайменше 5 символів
                </small>
              )}

              {!isLogin && (
                <>
                  <input
                    name="repeatPassword"
                    type="password"
                    placeholder="Повторіть пароль"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                  />
                  {formData.repeatPassword && !validation.passwordsMatch && (
                    <small style={{ color: "red" }}>Паролі не збігаються</small>
                  )}
                </>
              )}

              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}

              <button type="submit" className={styles.submitButton}>
                {isLogin ? "Увійти" : "Зареєструватися"}
              </button>
            </form>

            <p className={styles.toggleText}>
              {isLogin ? "Не маєш акаунту?" : "Є акаунт?"}
              <span
                className={styles.toggleLink}
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({
                    login: "",
                    password: "",
                    repeatPassword: "",
                  });
                  setValidation({
                    emailValid: false,
                    passwordValid: false,
                    emailTaken: false,
                    passwordsMatch: false,
                  });
                }}
              >
                {isLogin ? " Зареєструватися" : " Увійти"}
              </span>
            </p>
          </div>
        </motion.section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Rebuild — Платформа відновлення України</p>
      </footer>
    </div>
  );
};

export default HomePage;
