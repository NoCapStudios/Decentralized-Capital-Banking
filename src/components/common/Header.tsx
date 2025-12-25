import { NavLink, useNavigate, useLocation } from "react-router";
import logo from "../../assets/images/FullLogoSVG.svg";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import FlowCapLogo from "./Logo.tsx";
import "./Header.css";

gsap.registerPlugin(ScrollToPlugin);

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power3.inOut",
        });
      }, 100);
    } else {
      gsap.to(window, { duration: 1, scrollTo: target, ease: "power3.inOut" });
    }
  };
  return (
    <nav className="nav">
      <div className="nav-logo">
        <NavLink to="/">
          <img src={logo} className="nav-logo" alt="FlowCap Logo" />
        </NavLink>
        <span>FlowCap</span>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#hero" onClick={(e) => handleScroll(e, "#hero")}>
            Get Started
          </a>
        </li>
        <li>
          <a href="#analytics" onClick={(e) => handleScroll(e, "#analytics")}>
            About
          </a>
        </li>
        <li>
          <a href="#features" onClick={(e) => handleScroll(e, "#features")}>
            Features
          </a>
        </li>
        <li>
          <a href="#team" onClick={(e) => handleScroll(e, "#team")}>
            Team
          </a>
        </li>

        <div className="nav-divider"></div>

        <li>
          <NavLink to="/revenue-tracker">Tracker</NavLink>
        </li>
        <li>
          <NavLink to="/revenue-logger">Logger</NavLink>
        </li>
        <li>
          <NavLink to="/waitlist">Waitlist</NavLink>
        </li>
        <li>
          <NavLink to="/auth" className="auth-link">
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
