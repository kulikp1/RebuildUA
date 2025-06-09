import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./RequestsPage.module.css";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://6844cf88fc51878754d9e305.mockapi.io/bid")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка при отриманні замовлень:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Замовлення</h1>

        {loading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {requests.map(({ id, title, imageUrl, email }) => (
              <div key={id} className={styles.card}>
                <img src={imageUrl} alt={title} className={styles.image} />
                <div className={styles.content}>
                  <h2 className={styles.cardTitle}>{title}</h2>
                  <p className={styles.email}>{email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RequestsPage;
