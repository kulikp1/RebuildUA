import React from "react";
import { motion } from "framer-motion";
import styles from "./HomePage.module.css";
import Header from "../Header/Header";
import AuthForm from "../AuthForm/AuthForm";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Header />

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
          <AuthForm />
        </motion.section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Rebuild — Платформа відновлення України</p>
      </footer>
    </div>
  );
};

export default HomePage;
