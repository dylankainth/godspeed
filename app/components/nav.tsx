import styles from "./nav.module.css";
import Logo from "./logo";
import NavbarIcon from "./NavbarIcon";

const Nav: React.FC = async () => {
  return (
    <div className={styles.nav}>
      <a href="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 30,
          }}
        >
          <Logo />
          <strong>GODSPEED</strong>
        </div>
      </a>

      <div style={{ marginLeft: "auto" }}>
        <NavbarIcon />
      </div>
    </div>
  );
};

export default Nav;
