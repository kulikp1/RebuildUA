import React from "react";
import styles from "./CompanyPage.module.css";
import Header from "../Header/Header";
import { FaFolderOpen, FaCamera, FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // імпортуємо хук

const CompanyPage = () => {
  const navigate = useNavigate(); // ініціалізуємо навігатор

  const handleOpenRequests = () => {
    navigate("/requests"); // переходимо на сторінку заявок
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <h1 className={styles.title}>Панель компанії</h1>
          <p className={styles.subtitle}>
            Виберіть одну з дій для роботи із заявками платформи REBUILD.
          </p>

          <div className={styles.actions}>
            <div className={styles.card}>
              <FaFolderOpen className={styles.icon} />
              <h3>Переглянути заявки</h3>
              <p>Актуальні заявки на відновлення. Фільтруйте, приймайте.</p>
              <button onClick={handleOpenRequests}>Відкрити</button>
            </div>

            <div className={styles.card}>
              <FaCamera className={styles.icon} />
              <h3>Фото до / після</h3>
              <p>Додавайте фото до виконання та після завершення робіт.</p>
              <button>Завантажити</button>
            </div>

            <div className={styles.card}>
              <FaFileUpload className={styles.icon} />
              <h3>Завантажити звіти</h3>
              <p>Прикріпіть фінальні звіти для подальшої верифікації.</p>
              <button>Додати звіт</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
