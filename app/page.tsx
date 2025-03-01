import { Button } from "./components/ui/button";
import styles from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <section className={styles.hero}>
        <h1>
          Want to volunteer <strong>last minute</strong>?
        </h1>
        <Button variant="outline">Sign Up →</Button>
      </section>

      <div style={{ height: 1000 }} />
    </div>
  );
};

export default Home;
