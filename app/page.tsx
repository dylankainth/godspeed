import { Button } from "./components/ui/button";
import styles from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <h1>
            Want to volunteer <strong>last minute</strong>?
          </h1>
          <p>
            We help you find volunteer opportunities that fit your schedule.
          </p>
          <Button variant="outline">Sign Up →</Button>
        </div>
      </section>

      <div className="container">Hi</div>
    </div>
  );
};

export default Home;
