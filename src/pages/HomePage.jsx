import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <main className={styles.homepage}>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <p>
          <Link to="/Register">Sign up now</Link>
        </p>

        <p>
          <Link to="/Login">Already have an account? Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default Homepage;
