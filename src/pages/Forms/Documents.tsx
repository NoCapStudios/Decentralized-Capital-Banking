import { DocHeader } from "../../components/common/DocHeader.tsx";
import "../../styles/Documents.css";
import { BugReportForm } from "../../components/common/BugReportForm.tsx";

export function Documents() {
  return (
    <div className="landing-root">
      <DocHeader />

      <main className="docs-layout">
        <aside className="docs-sidebar">
          <nav className="docs-toc">
            <a href="#our-goals">Our Goals</a>
            <a href="#how-we-make-money">How We Make Money</a>
            <a href="#honesty-transparency">Honesty & Transparency</a>
            <a href="#application-standings">Application Standings</a>
            <a href="#policies">Policies</a>
            <a href="#terms">Terms & Conditions</a>
            <a href="#contacts">Contacts</a>
            <a href="#bug-report">Bug Report</a>
          </nav>
        </aside>

        <section className="docs-content">
          <section id="our-goals" className="doc-section">
            <header className="doc-section-header">What are our goals?</header>
            <article className="doc-section-body"></article>
          </section>

          <section id="how-we-make-money" className="doc-section">
            <header className="doc-section-header">Whats in it for us?</header>
            <article className="doc-section-body" />
          </section>

          <section id="honesty-transparency" className="doc-section">
            <header className="doc-section-header">
              Honesty & Transparency
            </header>
            <article className="doc-section-body" />
          </section>

          <section id="application-standings" className="doc-section">
            <header className="doc-section-header">
              Application standing criteria:
            </header>
            <article className="doc-section-body">
              <span className="sub-header pending">Pending Criteria</span>
              <div className="status-block">
                <ul>
                  <li>
                    Identification is not fully verified, including but not
                    limited to:
                    <ul>
                      <li>Missing government-issued ID</li>
                      <li>
                        Mismatched personal details (name, date of birth,
                        address)
                      </li>
                      <li>
                        Blurry, expired, or unreadable identification documents
                      </li>
                      <li>
                        Additional verification required due to automated or
                        manual checks
                      </li>
                    </ul>
                  </li>

                  <li>
                    Financial information is incomplete or requires
                    clarification:
                    <ul>
                      <li>Missing proof of income</li>
                      <li>No access to linked account or transaction data</li>
                      <li>
                        Incomplete or unclear gig, business, or revenue details
                      </li>
                    </ul>
                  </li>

                  <li>
                    Application flagged for manual review:
                    <ul>
                      <li>
                        Information appears inconsistent but not fraudulent
                      </li>
                      <li>Additional documentation has been requested</li>
                    </ul>
                  </li>

                  <li>
                    <h3>AND OR:</h3>
                    <ul>
                      <li>
                        Due too small team, application reviews usually submit
                        from 24-72 hours
                      </li>
                      <li>Priority levels may apply</li>{" "}
                    </ul>
                    <span
                      style={{
                        float: "right",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Read about priority levels
                    </span>
                  </li>
                </ul>
              </div>

              <span className="sub-header accepted">Acception Criteria</span>
              <div className="status-block">
                <ul>
                  <li>
                    Identity successfully verified and basic fraud checks passed
                  </li>
                  <li>
                    Demonstrates sufficient income or a realistic projected cash
                    flow to support the requested funding and repayment
                    structure
                  </li>
                  <li>
                    No major risk indicators, including:
                    <ul>
                      <li>Confirmed scams or fraudulent activity</li>
                      <li>Excessive chargebacks</li>
                      <li>Serious unresolved or delinquent debts</li>
                    </ul>
                  </li>
                  <li>
                    Deal terms fall within internal risk limits, including:
                    <ul>
                      <li>Requested amount aligns with income level</li>
                      <li>Repayment duration is reasonable</li>
                      <li>Revenue share percentage is sustainable and fair</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <span className="sub-header rejected">Rejection Criteria</span>
              <div className="status-block">
                <ul>
                  <li>
                    Insufficient or unstable income relative to the requested
                    amount, resulting in an unrealistic or potentially predatory
                    repayment scenario
                  </li>
                  <li>
                    Evidence of fraud or serious misconduct, including:
                    <ul>
                      <li>
                        Verified fraud activity within the last seven years
                      </li>
                      <li>
                        False or misleading information provided on the
                        application
                      </li>
                      <li>Use of fake or altered documents</li>
                      <li>Mismatched bank account ownership</li>
                      <li>
                        Repeated chargebacks or abusive financial behavior
                      </li>
                    </ul>
                  </li>
                  <li>
                    Application remains incomplete after the required deadline
                  </li>
                  <li>
                    Internal risk limits exceeded, including:
                    <ul>
                      <li>Too many active or recent funding agreements</li>
                      <li>
                        Exposure to sectors we do not fund due to elevated risk
                      </li>
                      <li>
                        Business models or activities deemed unsuitable at our
                        discretion
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section id="policies" className="doc-section">
            <header className="doc-section-header">Our Policies</header>
            <article className="doc-section-body">
              <div className="policy-block" />
              <div className="policy-block" />
              <div className="policy-block" />
            </article>
          </section>

          <section id="terms" className="doc-section">
            <header className="doc-section-header">Terms & Conditions</header>
            <article className="doc-section-body" />
          </section>

          <section id="contacts" className="doc-section">
            <header className="doc-section-header">Contacts Us</header>
            <article className="doc-section-body"></article>
          </section>

          <section id="bug-report" className="doc-section">
            <header className="doc-section-header">Bug Report</header>
            <article className="doc-section-body">
              <BugReportForm />
            </article>
          </section>
        </section>
      </main>
    </div>
  );
}
