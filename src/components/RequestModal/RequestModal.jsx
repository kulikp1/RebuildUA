import React from "react";
import styles from "./RequestModal.module.css";

const RequestModal = ({ request, onClose }) => {
  if (!request) return null;

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
        <h2 className={styles.title}>{request.title}</h2>
        <p className={styles.label}>Опис проблеми:</p>
        <p className={styles.description}>
          {request.description || "Опис відсутній"}
        </p>
        <p className={styles.label}>Контакти:</p>
        <p className={styles.email}>{request.email}</p>
      </div>
    </div>
  );
};

export default RequestModal;
