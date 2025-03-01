import styles from "./nav.module.css";
import Logo from "./logo";

const Nav: React.FC = () => {
  return (
    <div className={styles.nav}>
      <a href="/">
        <div style={{ display: "flex", gap: 10 }}>
          <Logo />
          <strong>Godspeed</strong>
        </div>
      </a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  );
};

export default Nav;
