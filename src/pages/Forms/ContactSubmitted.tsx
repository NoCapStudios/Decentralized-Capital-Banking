import { NavLink } from "react-router";
import "../../styles/SuccessPage.css";

export function ContactSubmitted() {
  return (
    <div className="landing-root">
      <main>
        <section className="doc-section">
          <header className="doc-section-header">Your reaching out!</header>

          <article className="doc-section-body">
            <p>
              Thank you for taking the time to tell us about what you feel is
              important & or any suggestions. Your feedback helps us improve the
              platform and ensure a better experience for everyone.
            </p>

            <p>
              Our team will review your request/gripe and take action if
              necessary. You may be contacted if additional information is
              required.
            </p>

            <NavLink to="/documents" className="bug-submit-btn">
              Return to Documents
            </NavLink>
          </article>
        </section>
      </main>
    </div>
  );
}
