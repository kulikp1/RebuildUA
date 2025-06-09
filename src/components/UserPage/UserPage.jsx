import React, { useState, useEffect } from "react";
import styles from "./UserPage.module.css";
import Header from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../AuthForm/toastifyOverrides.css";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [userEmail, setUserEmail] = useState("Громадянине");
  const [rawEmail, setRawEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      const name = email.split("@")[0];
      setUserEmail(name.charAt(0).toUpperCase() + name.slice(1));
      setRawEmail(email);
    } else {
      setUserEmail("Громадянине");
      setRawEmail("unknown@example.com");
    }
  }, []);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "unsigned_rebuild");
    data.append("cloud_name", "dwzh7gxwq");

    try {
      setUploading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwzh7gxwq/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();

      if (!result.secure_url) throw new Error("Cloudinary не повернув URL.");

      setImageUrl(result.secure_url);
      toast.success("Зображення успішно завантажено!");
    } catch (err) {
      console.error("Помилка завантаження:", err);
      toast.error("Не вдалося завантажити зображення.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      uploadToCloudinary(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.warn("Зачекайте, поки зображення завантажиться.");
      return;
    }

    const formData = {
      title,
      description,
      location,
      imageUrl,
      email: rawEmail || "unknown@example.com",
    };

    try {
      setSubmitting(true);
      const res = await fetch(
        "https://6844cf88fc51878754d9e305.mockapi.io/bid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Помилка надсилання заявки.");

      toast.success("Заявку надіслано успішно!");
      setTitle("");
      setDescription("");
      setLocation("");
      setFile(null);
      setImageUrl("");
    } catch (err) {
      console.error("Помилка при надсиланні:", err);
      toast.error("Не вдалося надіслати заявку.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMyBidsClick = () => {
    navigate("/my-bids");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Ласкаво просимо, {userEmail}!</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Створити заявку на відбудову</h2>

          <input
            type="text"
            className={styles.input}
            placeholder="Заголовок (наприклад: Відновлення вікон)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className={styles.textarea}
            placeholder="Опис проблеми"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            className={styles.input}
            placeholder="Адреса (локація проблеми)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            id="file"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="file" className={styles.fileLabel}>
            {uploading
              ? "⏳ Завантаження..."
              : file
              ? `Обрано: ${file.name}`
              : "Додати зображення"}
          </label>

          {imageUrl && (
            <img src={imageUrl} alt="preview" className={styles.imagePreview} />
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={uploading || submitting}
            >
              {submitting ? "⏳ Надсилання..." : "Надіслати заявку"}
            </button>

            <button
              type="button"
              className={styles.myBidsButton}
              onClick={handleMyBidsClick}
            >
              Мої заявки
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default UserPage;
