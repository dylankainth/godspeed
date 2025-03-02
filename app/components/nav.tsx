import styles from "./nav.module.css";
import Logo from "./logo";
import NavbarIcon from "./NavbarIcon";
import Link from "next/link";

const Nav: React.FC = async () => {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <div
          className="handwritten"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Logo />
          <strong
          style={[fontSize: 50,]}
          >GODSPEED.</strong>
        </div>
      </Link>

      <div style={{ marginLeft: "auto" }}>
        <NavbarIcon />
      </div>
    </div>
  );
};

export default Nav;
