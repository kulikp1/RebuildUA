import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>REBUILD</div>
      <nav className={styles.nav}>
        <button onClick={handleLogout} className={styles.navLink}>
          Вийти
        </button>
        <Link to="/about" className={styles.navLink}>
          Про нас
        </Link>
      </nav>
    </header>
  );
};

export default Header;
