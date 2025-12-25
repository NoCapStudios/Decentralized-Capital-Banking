import { NavLink } from "react-router";
import "../../styles/Documents.css";

export function BugSubmitted() {
  return (
    <div className="landing-root">
      <main className="docs-layout">
        <section className="doc-section" style={{ maxWidth: 720 }}>
          <header className="doc-section-header">Bug Report Submitted</header>

          <article className="doc-section-body">
            <p>
              Thank you for taking the time to report this issue. Your feedback
              helps us improve the platform and ensure a better experience for
              everyone.
            </p>

            <p>
              Our team will review your report and take action if necessary. You
              may be contacted if additional information is required.
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
