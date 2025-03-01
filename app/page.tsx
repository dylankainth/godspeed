import { Button } from "./components/ui/button";
import styles from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <section className={styles.hero}>
        Want to volunteer last minute?
        <Button>Click me</Button>
      </section>

      <div style={{ height: 1000 }} />
    </div>
  );
};

export default Home;
