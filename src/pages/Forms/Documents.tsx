import { DocHeader } from "../../components/common/DocHeader.tsx";
import "../../styles/Documents.css";
import { BugReportForm } from "../../components/common/BugReportForm.tsx";
import { ContactUs } from "../../components/common/ContactUs.tsx";
import { useNavigate, useLocation } from "react-router";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollToPlugin);

export function Documents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

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
        duration: 0.8,
        scrollTo: { y: target, offsetY: 50 },
        ease: "power3.inOut",
      });
    }
  };

  // Add scroll spy to highlight active section
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = [
        "our-goals",
        "how-we-make-money",
        "honesty-transparency",
        "application-standings",
        "priority-levels",
        "policies",
        "terms",
        "contacts",
        "bug-report",
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <div className="landing-root">
      <DocHeader />

      <main className="docs-layout">
        <aside className="docs-sidebar">
          <nav className="docs-toc">
            <a
              href="#our-goals"
              onClick={(e) => handleScroll(e, "#our-goals")}
              className={activeSection === "#our-goals" ? "active" : ""}
            >
              Our Goals
            </a>
            <a
              href="#how-we-make-money"
              onClick={(e) => handleScroll(e, "#how-we-make-money")}
              className={activeSection === "#how-we-make-money" ? "active" : ""}
            >
              Ventures
            </a>
            <a
              href="#honesty-transparency"
              onClick={(e) => handleScroll(e, "#honesty-transparency")}
              className={
                activeSection === "#honesty-transparency" ? "active" : ""
              }
            >
              Honesty & Transparency
            </a>
            <a
              href="#application-standings"
              onClick={(e) => handleScroll(e, "#application-standings")}
              className={
                activeSection === "#application-standings" ? "active" : ""
              }
            >
              Application Standings
            </a>
            <a
              href="#priority-levels"
              onClick={(e) => handleScroll(e, "#priority-levels")}
              className={activeSection === "#priority-levels" ? "active" : ""}
            >
              Priority levels
            </a>
            <a
              href="#policies"
              onClick={(e) => handleScroll(e, "#policies")}
              className={activeSection === "#policies" ? "active" : ""}
            >
              Policies
            </a>
            <a
              href="#terms"
              onClick={(e) => handleScroll(e, "#terms")}
              className={activeSection === "#terms" ? "active" : ""}
            >
              Terms & Conditions
            </a>
            <a
              href="#contacts"
              onClick={(e) => handleScroll(e, "#contacts")}
              className={activeSection === "#contacts" ? "active" : ""}
            >
              Contacts
            </a>
            <a
              href="#bug-report"
              onClick={(e) => handleScroll(e, "#bug-report")}
              className={activeSection === "#bug-report" ? "active" : ""}
            >
              Bug Report
            </a>
          </nav>
        </aside>

        <section className="docs-content">
          <section id="our-goals" className="doc-section">
            <header className="doc-section-header">What are our goals?</header>
            <article className="doc-section-body">
              <p>
                Our organization exists to create a system which provides equal
                opportunities to people through a basic process that delivers
                quick results for working staff members. We want people with
                real work ethic and a clear plan to be able to unlock the tools,
                capital, and guidance they need without getting buried in debt,
                paperwork, or predatory terms. The system delivers advantages to
                workers through their present employment activities instead of
                creating negative consequences because of their past mistakes.
                The platform enables regular investors to support actual
                business owners and their work activities through clear
                investment methods. Our organization works to establish matched
                business relationships which will result in mutual success
                during times of high activity. The platform needs to develop
                into a system which enables money transfers while simultaneously
                creating trust relationships, skill development, and sustainable
                financial stability for its users.
              </p>
            </article>
          </section>

          <section id="how-we-make-money" className="doc-section">
            <header className="doc-section-header">What's in it for us?</header>
            <article className="doc-section-body">
              <p>
                What's in it for us is the chance to build a real, durable
                business while doing something that actually improves people's
                lives. FlowCap earns money by taking a capped share of
                successful hustles, so when the people on the platform win, the
                business wins too. The team now has a method to generate actual
                financial returns which will attract investors who want to back
                a business that promotes ethical practices over deceptive
                methods. The data collection process, relationship development,
                and reputation growth during our journey will create positive
                outcomes. Our platform enables thousands of young entrepreneurs
                to receive funding which helps them maintain their progress
                while we discover successful methods, unsuccessful approaches,
                and determine future product development locations. The addition
                of new features enables better capital partner negotiations
                which leads to market leadership against any potential
                competitors who try to duplicate the concept.
              </p>
            </article>
          </section>

          <section id="honesty-transparency" className="doc-section">
            <header className="doc-section-header">
              Honesty & Transparency
            </header>
            <article className="doc-section-body">
              <p>
                The quickest path to build trust demands that we reveal our
                present knowledge together with all the information which still
                remains unclear to us. The platform shows users their complete
                capital expenses which include percentage shares, payment
                limits, and duration requirements without any additional costs
                or unexpected contract provisions. The platform will show all
                its performance metrics together with investor earnings and
                financial sharing details. We will immediately state any
                problems which occur and perform all necessary corrections in
                front of everyone. Our team operates with honest methods which
                we apply to our work with clients.
              </p>
              <p>
                We're young, we're learning as we go, and we're not pretending
                to have all the answers. The team has invested its own resources
                into this project because we strongly believe in its potential
                and we will demonstrate its effectiveness. We must accept full
                responsibility for every mistake which happens to us. We
                directly handle all concerns which investors and hustlers may
                have. The industry operates with numerous complex terms and
                deceptive marketing statements, yet our platform stands out
                because users understand all aspects of our service.
              </p>
            </article>
          </section>

          <section id="application-standings" className="doc-section">
            <header className="doc-section-header">
              Application Standing Criteria
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
                    <h3>AND/OR:</h3>
                    <ul>
                      <li>
                        Due to a small team, application reviews usually take
                        24-72 hours
                      </li>
                      <li>Priority levels may apply</li>
                    </ul>
                    <a
                      href="#priority-levels"
                      onClick={(e) => handleScroll(e, "#priority-levels")}
                      style={{
                        float: "right",
                        paddingRight: "10px",
                        paddingBottom: "10px",
                        color: "#10b99d",
                        cursor: "pointer",
                      }}
                    >
                      Read about priority levels
                    </a>
                  </li>
                </ul>
              </div>

              <span className="sub-header accepted">Acceptance Criteria</span>
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

          <section id="priority-levels" className="doc-section">
            <header className="doc-section-header">Priority Levels</header>

            <article className="doc-section-body">
              <span className="sub-header">Capital Allocation Criteria</span>

              <p>
                Due to the inherent risk associated with defaulters and
                insolvent applicants, we currently prioritize applications from
                individuals or businesses that have generated more than{" "}
                <strong>$5,000 in revenue</strong>. Applicants in this category
                statistically demonstrate a higher likelihood of meeting
                repayment obligations within the agreed contractual terms.
              </p>

              <p>
                This policy does <strong>not</strong> mean that applications
                reporting less than $5,000 in revenue are automatically
                rejected. Instead, these applications undergo additional review.
              </p>

              <p>
                In such cases, our team may reach out directly to better
                understand the applicant's business model, income consistency,
                and demonstrated ability to repay the requested capital. Strong
                evidence of reliability, execution, and growth potential may
                still qualify an applicant for approval.
              </p>
            </article>
          </section>

          <section id="policies" className="doc-section">
            <header className="doc-section-header">Our Policies</header>
            <article className="doc-section-body">
              <div className="policy-block">
                <p>
                  The platform operates through various fundamental policies
                  which protect users who work hard and investors, and maintain
                  platform equity and operational stability. All capital
                  agreements contain a rigid repayment restriction which defines
                  the highest amount investors must return before the agreement
                  ends and the hustler takes back all future earnings. The rules
                  must remain fixed because there should be no extension of
                  deadlines and no alteration of established targets. The team
                  needs documented capital usage because it allows all members
                  to view funding purposes and monitor collective work progress.
                </p>
              </div>
              <div className="policy-block">
                <p>
                  Third, we prohibit predatory terms from our minimum agreements
                  because these agreements have realistic targets which business
                  owners can reach while maintaining their business operations
                  and pricing power.
                </p>
              </div>
              <div className="policy-block">
                <p>
                  Our organization maintains strict due diligence standards
                  which help investors understand their investment choices
                  through complete knowledge of backed companies, their
                  performance history, and expected return duration. The system
                  provides users with a fast method to settle disputes through a
                  neutral process which guarantees complete fairness for all
                  participants. The company maintains strict protection for both
                  financial data and user privacy information which remains
                  confidential, and we do not distribute user information to
                  outside companies. Our fee system operates with a clear and
                  transparent model which charges a minimal percentage of
                  capital transactions to maintain platform operations and
                  infrastructure costs. Everything else gets reinvested into
                  making the product better.
                </p>
              </div>
            </article>
          </section>

          <section id="terms" className="doc-section">
            <header className="doc-section-header">Terms & Conditions</header>
            <article className="doc-section-body">
              <p className="coming-soon">Coming soon...</p>
            </article>
          </section>

          <section id="contacts" className="doc-section">
            <header className="doc-section-header">Contact Us</header>
            <article className="doc-section-body">
              <ContactUs />
            </article>
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
