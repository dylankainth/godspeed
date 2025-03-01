import styles from "./nav.module.css";

const Nav: React.FC = () => {
  return (
    <div className={styles.nav}>
      <a href="/">
        <strong>Godspeed</strong>
      </a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  );
};

export default Nav;
