import { NavLink } from "react-router";
import { Header } from "../components/common/Header";
import { useEffect, useRef } from "react";
import FlowCapLogo from "../components/common/Logo.tsx";
import ScrollGraphAnimation from "../components/animations/ScrollingGraphAnimation.tsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/LandingPage.css";

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !sectionRef.current) return;

      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.from(".hero-logo", {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      });
      gsap.to(".hero-logo", {
        y: -20,
        duration: 2.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.from(".hero-text h1", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-text p", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
      });
      gsap.to(".badge", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        y: 100,
        ease: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 50%",
          scrub: 1,
          markers: false,
        },
      });

      // Animate the path drawing
      tl.to(
        pathRef.current,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      // Animate the money counter (Numerical Ticker)
      const obj = { value: 1000 };
      tl.to(
        obj,
        {
          value: 35000,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.innerText = `$${Math.floor(
                obj.value
              ).toLocaleString()}`;
            }
          },
        },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="landing-root">
      <title>FlowCap | Capital for Hustlers</title>
      <Header />

      <main className="content-wrapper">
        <section id="hero" className="hero-section" ref={heroRef}>
          <div className="hero-background">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>

          <div className="hero-visuals hero-logo">
            <FlowCapLogo size={220} />
          </div>

          <div className="hero-text">
            <h1 className="gradient-text">
              Fund your hustle, share your profit.
            </h1>
            <p>
              Interest-free capital for the next generation of builders. No
              debt, just partnership.
            </p>
            <div className="cta-group">
              <NavLink className="primary-btn" to="/get-started">
                Get Funded
                <span className="btn-arrow">→</span>
              </NavLink>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line"></div>
          </div>
        </section>

        <section id="growth" className="glass-section" ref={sectionRef}>
          <div className="section-header">
            <span className="badge">Real-time Growth</span>
            <h2>Your capital, scaling with you.</h2>
          </div>
          <div className="growth-display">
            <div className="money-counter" ref={counterRef}>
              $1,000
            </div>
            <svg
              className="growth-chart"
              viewBox="0 0 500 200"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M0 180 L80 150 L160 165 L240 120 L320 130 L400 80 L500 40"
              />
            </svg>
          </div>
        </section>

        <section id="analytics" className="full-width-anim">
          <ScrollGraphAnimation />
        </section>

        <section id="features" className="features-section">
          <div className="section-header">
            <h2>Why FlowCap?</h2>
          </div>
          <div className="bento-grid">
            <div className="feature-card highlighted-reverse">
              <div className="icon">💰</div>
              <h3>Zero Interest</h3>
              <p>We don't believe in predatory rates. We win when you win.</p>
            </div>
            <div className="feature-card highlighted">
              <div className="icon">🚀</div>
              <h3>Fast Approval</h3>
              <p>
                Funding in days, not months. Speed is your competitive
                advantage.
              </p>
            </div>
            <div className="feature-card highlighted-reverse">
              <div className="icon">🤝</div>
              <h3>Shared Success</h3>
              <p>Flexible repayments based on your monthly revenue.</p>
            </div>
            <div className="feature-card highlighted">
              <div className="icon">📈</div>
              <h3>Growth Tools</h3>
              <p>Access our network of mentors and proprietary analytics.</p>
            </div>
            <div className="feature-card highlighted-reverse">
              <div className="icon">📈</div>
              <h3>Empty</h3>
              <p>Place feature here.</p>
            </div>
            <div className="feature-card highlighted">
              <div className="icon">📈</div>
              <h3>Empty</h3>
              <p>Place feature here.</p>
            </div>
          </div>
        </section>

        <section id="team" className="team-section">
          <div className="section-header">
            <span className="badge">The Core Team</span>
            <h2>Built by Builders</h2>
            <p>
              The small, agile team driving the future of profit-sharing
              capital.
            </p>
          </div>

          <div className="team-grid">
            {[
              {
                name: "SM Ayat",
                role: "Chief Executive Officer",
                initial: "S.M",
              },
              {
                name: "Dihyah Adib",
                role: "Chief Technology Officer",
                initial: "D.A",
              },
              { name: "Dihyah Adib", role: "Operations Lead", initial: "D" },
              { name: "Dihyah Adib", role: "UX/UI Design Lead", initial: "D" },
            ].map((member, i) => (
              <div key={i} className="member-card">
                <div className="avatar-wrapper">
                  <div className="avatar-placeholder">{member.initial}</div>
                  <div className="avatar-ring"></div>
                </div>
                <h4>{member.name}</h4>
                <span className="member-role">{member.role}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
