import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyBidsPage.module.css";
import Header from "../Header/Header";

const MyBidsPage = () => {
  const [bids, setBids] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail.toLowerCase().trim());
    }
  }, []);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get(
          "https://6844cf88fc51878754d9e305.mockapi.io/bid"
        );
        const allBids = response.data;

        console.log("ВСІ заявки з API:", allBids);
        console.log("Email з localStorage:", userEmail);

        const userBids = allBids.filter(
          (bid) => bid.email && bid.email.toLowerCase().trim() === userEmail
        );

        console.log("Заявки цього користувача:", userBids);
        setBids(userBids);
      } catch (error) {
        console.error("Помилка при завантаженні заявок:", error);
      }
    };

    if (userEmail) {
      fetchBids();
    }
  }, [userEmail]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />

      <div className={styles.myBidsContainer}>
        <h2 className={styles.title}>Мої заявки</h2>
        <button onClick={handleBack} className={styles.backButton}>
          Повернутися
        </button>
        {bids.length > 0 ? (
          <ul className={styles.bidsList}>
            {bids.map((bid) => (
              <li key={bid.id} className={styles.bidItem}>
                <p className={styles.bidField}>
                  <span className={styles.bidLabel}>Заголовок:</span>{" "}
                  {bid.title}
                </p>
                <p className={styles.bidField}>
                  <span className={styles.bidLabel}>Опис:</span>{" "}
                  {bid.description}
                </p>
                <p className={styles.bidField}>
                  <span className={styles.bidLabel}>Статус:</span> {bid.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noBidsText}>У вас ще немає заявок.</p>
        )}
      </div>
    </>
  );
};

export default MyBidsPage;
