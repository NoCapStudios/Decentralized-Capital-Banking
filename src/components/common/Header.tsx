import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
import "../../styles/Header.css";

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
            <HashLink to="/#install-app">Download App</HashLink>
          </li>
          <li>
            <NavLink to="/revenue-tracker">Tracker</NavLink>
          </li>
          <li>
            <NavLink to="/revenue-logger">Logger</NavLink>
          </li>
          <li>
            <NavLink to="/auth">isSignedUp ? Sign In : Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
