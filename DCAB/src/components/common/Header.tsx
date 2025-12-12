import { NavLink } from "react-router";
import "./Header.css";

export function Header() {
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <img src="src/assets/logo.png" className="nav-logo" />
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Download App</NavLink>
          </li>
          <li>
            <NavLink to="/revenue-tracker">Tracker</NavLink>
          </li>
          <li>
            <NavLink to="/revenue-logger">Logger</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
