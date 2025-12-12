import { NavLink } from "react-router";
import { Header } from "../components/common/Header";
import "./LandingPage.css";

export function LandingPage() {
  return (
    <>
      <title>Get the capital your hustle deserves.</title>
      <Header />
      <div className="Landing animated-gradient">
        <section className="hero">
          <div className="hero-content">
            <h1>Fund your hustle, share your profit</h1>
            <p className="CatchPhrase">
              Intrest free capital for serious hustler
            </p>

            <NavLink className="hero-btn" to="/get-started">
              Get Started
            </NavLink>
          </div>
        </section>
      </div>
    </>
  );
}
