import styles from "./footer.module.css";
import Logo from "./logo";

const Footer: React.FC = () => {
  return (
    <nav className={styles.footer}>
      <div>
        <Logo />
        <p>© 2021 Your Company</p>
      </div>
    </nav>
  );
};

export default Footer;
