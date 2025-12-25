import { NavLink, useNavigate, useLocation } from "react-router";
import logo from "../../assets/images/FullLogoSVG.svg";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import FlowCapLogo from "./Logo.tsx";
import "../../styles/Header.css";

gsap.registerPlugin(ScrollToPlugin);

export function DocHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();

    if (location.pathname !== "/documents") {
      navigate("/documents");
      setTimeout(() => {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power3.inOut",
        });
      }, 100);
    } else {
      gsap.to(window, {
        duration: 0.5,
        scrollTo: { y: target, offsetY: 50 },
        ease: "power3.inOut",
      });
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
          <a href="#our-goals" onClick={(e) => handleScroll(e, "#our-goals")}>
            Our Goals
          </a>
        </li>
        <li>
          <a
            href="#how-we-make-money"
            onClick={(e) => handleScroll(e, "#how-we-make-money")}
          >
            Ventures
          </a>
        </li>
        <li>
          <a
            href="#honesty-transparency"
            onClick={(e) => handleScroll(e, "#honesty-transparency")}
          >
            Honesty & Transparency
          </a>
        </li>
        <li>
          <a
            href="#application-standings"
            onClick={(e) => handleScroll(e, "#application-standings")}
          >
            Application Standings
          </a>
        </li>
        <li>
          <a href="#policies" onClick={(e) => handleScroll(e, "#policies")}>
            Policies
          </a>
        </li>
        <li>
          <a href="#terms" onClick={(e) => handleScroll(e, "#terms")}>
            Terms & Conditions
          </a>
        </li>
        <div className="nav-divider"></div>
        <li>
          <a href="#contacts" onClick={(e) => handleScroll(e, "#contacts")}>
            Contacts
          </a>
        </li>
        <li>
          <a href="#bug-report" onClick={(e) => handleScroll(e, "#bug-report")}>
            Bug Report
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
          <NavLink to="/revenue-logger">User Portal</NavLink>
        </li>

        <div className="nav-divider"></div>
      </ul>
    </nav>
  );
}
