import styles from "./footer.module.css";
// import Logo from "./logo";

const Footer: React.FC = () => {
  return (
    <nav className={styles.footer}>
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </nav>
  );
};

export default Footer;
