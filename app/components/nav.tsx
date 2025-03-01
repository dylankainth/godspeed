import styles from "./nav.module.css";
import Logo from "./logo";
import NavbarIcon from "./NavbarIcon";
const Nav: React.FC = async () => {
  return (
    <div className={styles.nav}>
      <a href="/">
        <div style={{ display: "flex", gap: 10 }}>
          <Logo />
          <strong>Godspeed</strong>
        </div>
      </a>

      <div style={{ marginLeft: "auto" }}>
        <NavbarIcon />
      </div>
    </div>
  );
};

export default Nav;
