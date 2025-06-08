import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastifyOverrides.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("citizen");
  const [isLogin, setIsLogin] = useState(false);
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
      const login = formData.login;

      if (!login || !isEmail(login)) {
        setValidation((prev) => ({ ...prev, emailTaken: false }));
        return;
      }

      try {
        const res = await fetch(
          "https://6844cf88fc51878754d9e305.mockapi.io/users"
        );
        const users = await res.json();

        const emailTaken = users.some(
          (user) => user.login.toLowerCase() === login.toLowerCase()
        );

        setValidation((prev) => ({ ...prev, emailTaken }));
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

    if (!validation.emailValid) {
      toast.error("Невірний формат email");
      return;
    }
    if (!validation.passwordValid) {
      toast.error("Пароль повинен містити щонайменше 5 символів");
      return;
    }
    if (!isLogin && !validation.passwordsMatch) {
      toast.error("Паролі не збігаються");
      return;
    }
    if (!isLogin && validation.emailTaken) {
      toast.error("Такий email вже зареєстрований");
      return;
    }

    if (isLogin) {
      navigate(userType === "citizen" ? "/userPage" : "/companyPage");
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
        toast.error("Помилка при реєстрації. Спробуйте пізніше.");
      }
    }
  };

  return (
    <div className={styles.formCard}>
      <ToastContainer />
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
            setFormData({ login: "", password: "", repeatPassword: "" });
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
  );
};

export default AuthForm;
