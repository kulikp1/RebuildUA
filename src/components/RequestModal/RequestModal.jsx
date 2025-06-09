import React from "react";
import styles from "./RequestModal.module.css";

const RequestModal = ({ request, onClose }) => {
  if (!request) return null;

  const handleTakeRequest = () => {
    alert(`Заявку "${request.title}" взято в роботу!`);
    // Тут можна реалізувати POST-запит або зміну статусу заявки
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <img
          src={request.imageUrl}
          alt={request.title}
          className={styles.image}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>Проблема</h2>
          <p className={styles.text}>{request.title}</p>

          <h3 className={styles.label}>Опис проблеми</h3>
          <p className={styles.text}>
            {request.description || "Опис відсутній."}
          </p>

          <h3 className={styles.label}>Локація</h3>
          <p className={styles.text}>
            {request.location || "Локація не вказана."}
          </p>

          <h3 className={styles.label}>Контакти</h3>
          <p className={styles.text}>{request.email}</p>
        </div>

        <button className={styles.actionButton} onClick={handleTakeRequest}>
          Взяти в роботу
        </button>
      </div>
    </div>
  );
};

export default RequestModal;
