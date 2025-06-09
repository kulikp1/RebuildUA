import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./RequestsPage.module.css";
import RequestModal from "../RequestModal/RequestModal";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

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
            {requests.map((req) => (
              <div key={req.id} className={styles.card}>
                <img
                  src={req.imageUrl}
                  alt={req.title}
                  className={styles.image}
                />
                <div className={styles.content}>
                  <p className={styles.label}>Проблема:</p>
                  <h2 className={styles.cardTitle}>{req.title}</h2>

                  <p className={styles.label}>Контакти:</p>
                  <p className={styles.email}>{req.email}</p>

                  <button
                    className={styles.detailsButton}
                    onClick={() => setSelectedRequest(req)}
                  >
                    Детальніше
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <RequestModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

export default RequestsPage;
