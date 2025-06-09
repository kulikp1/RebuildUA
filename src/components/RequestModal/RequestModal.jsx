import React from "react";
import styles from "./RequestModal.module.css";
import { MapPin, Mail, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const RequestModal = ({ request, onClose }) => {
  if (!request) return null;

  const handleTakeRequest = async () => {
    try {
      const response = await fetch(
        `https://6844cf88fc51878754d9e305.mockapi.io/bid/${request.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "в роботі" }),
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося оновити статус.");
      }

      toast.success(`Заявку "${request.title}" взято в роботу!`);
      onClose();
    } catch (error) {
      console.error("Помилка при оновленні:", error);
      toast.error("Сталася помилка при оновленні статусу.");
    }
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
          <div className={styles.section}>
            <h2 className={styles.title}>
              <AlertCircle className={styles.icon} />
              {request.title}
            </h2>
          </div>

          <div className={styles.section}>
            <h3 className={styles.label}>Опис проблеми</h3>
            <div className={styles.descriptionScroll}>
              {request.description || "Опис відсутній."}
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <h3 className={styles.label}>
                <Mail className={styles.icon} />
                Контакти
              </h3>
              <p className={styles.text}>{request.email}</p>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.label}>
                <MapPin className={styles.icon} />
                Локація
              </h3>
              <p className={styles.text}>
                {request.location || "Локація не вказана."}
              </p>
            </div>
          </div>
        </div>

        <button className={styles.actionButton} onClick={handleTakeRequest}>
          Взяти в роботу
        </button>
      </div>
    </div>
  );
};

export default RequestModal;
