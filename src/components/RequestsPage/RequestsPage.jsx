/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./RequestsPage.module.css";
import RequestModal from "../RequestModal/RequestModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  // Функція для отримання заявок
  const fetchRequests = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Витягуємо тільки міста з location
  const extractCity = (location) => {
    if (!location) return "Невідомо";
    const match = location.match(/м\. ?([А-Яа-яІіЇїЄєҐґ\-]+)/i);
    return match
      ? `м. ${match[1][0].toUpperCase()}${match[1].slice(1).toLowerCase()}`
      : "Невідомо";
  };

  // Отримуємо всі унікальні міста, з однаковим форматом (м. Київ, м. Львів, тощо)
  const cities = Array.from(
    new Set(
      requests
        .map((req) => extractCity(req.location))
        .filter((c) => c !== "Невідомо")
    )
  );

  // Фільтрація без залежності від регістру
  const filteredRequests = selectedCity
    ? requests.filter(
        (req) =>
          extractCity(req.location).toLowerCase() === selectedCity.toLowerCase()
      )
    : requests;
  return (
    <div className={styles.wrapper}>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Замовлення</h1>

        {cities.length > 0 && (
          <div className={styles.filterWrapper}>
            <label htmlFor="cityFilter" className={styles.filterLabel}>
              Фільтр за містом:
            </label>
            <select
              id="cityFilter"
              className={styles.filterSelect}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Усі міста</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <button onClick={() => navigate(-1)} className={styles.backButton}>
              Повернутися
            </button>
          </div>
        )}

        {loading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.grid}>
            {filteredRequests.map((req) => {
              const isInProgress = req.status === "в роботі";

              return (
                <div key={req.id} className={styles.card}>
                  <img
                    src={req.imageUrl}
                    alt={req.title}
                    className={styles.image}
                  />

                  {isInProgress && (
                    <div className={styles.cardOverlay}>
                      <span className={styles.cardOverlayText}>
                        Виконується...
                      </span>
                    </div>
                  )}

                  <div className={styles.content}>
                    <div className={styles.cardTop}>
                      <div className={styles.leftColumn}>
                        <p className={styles.label}>Проблема:</p>
                        <h2 className={styles.cardTitle}>{req.title}</h2>

                        <p className={styles.label}>Контакти:</p>
                        <p className={styles.email}>{req.email}</p>
                      </div>

                      <div className={styles.rightColumn}>
                        <p className={styles.label}>Локація:</p>
                        <p className={styles.location}>
                          {req.location || "Локація не вказана"}
                        </p>
                      </div>
                    </div>

                    <button
                      className={styles.detailsButton}
                      onClick={() => setSelectedRequest(req)}
                      disabled={isInProgress}
                    >
                      Детальніше
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <RequestModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onStatusChange={fetchRequests}
      />
    </div>
  );
};

export default RequestsPage;
