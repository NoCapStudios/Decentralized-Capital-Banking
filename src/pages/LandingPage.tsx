import { NavLink } from "react-router";
import { Header } from "../components/common/Header";
import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

export function LandingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [displayAmount, setDisplayAmount] = useState(1000);
  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);

      path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;

      const min = 1000;
      const max = 35000;
      setDisplayAmount(Math.floor(min + (max - min) * progress));
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <title>Get the capital your hustle deserves.</title>
      <Header />
      <div className="Landing animated-gradient">
        <section className="hero">
          <div className="hero-content">
            <h1>Fund your hustle, share your profit</h1>
            <p>Intrest free capital for serious hustler</p>

            <NavLink className="hero-btn" to="/get-started">
              Get Started
            </NavLink>
          </div>
        </section>

        <section className="growth-section" ref={sectionRef}>
          <div className="growth-content">
            <h1>Your capital, growing</h1>

            <div className="money-counter">
              ${displayAmount.toLocaleString()}
            </div>

            <svg
              className="stock-graph"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M0 180 L80 150 L160 165 L240 120 L320 130 L400 80 L500 40"
                fill="none"
                stroke="#00ff9c"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </section>

        <section id="install-app" className="install-app">
          <div>
            <h1>Download our App</h1>
            <p>For iOS & Andriod</p>
          </div>
        </section>

        <section id="team" className="team">
          <div>
            <h1>Meet the team</h1>
            <p>Four man operation</p>
          </div>
        </section>
      </div>
    </>
  );
}
