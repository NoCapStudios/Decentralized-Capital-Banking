import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { fetchApplication } from "../../api/applications";
import { useForm } from "../../context/FormContext";
import "../../styles/UserPanel.css";

export function UserPanel() {
  const { formData } = useForm();
  const [application, setApplication] = useState<
    "pending" | "rejected" | "accepted"
  >("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplication() {
      const app = await fetchApplication(formData.email);
      if (app) {
        setApplication(app.status);
      }
      setLoading(false);
    }
    loadApplication();
  }, [formData.email]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-panel">
      <header className="user-panel-header">
        <h1>
          Welcome to Your Dashboard,{" "}
          {formData.names.prefered || formData.names.first}
        </h1>
        <p>Your request has been submitted successfully.</p>
      </header>

      <section className="user-panel-cards">
        <div className="panel-card">
          <h2>Application Status</h2>
          <p
            className={`status ${
              application === "pending"
                ? "pending"
                : application === "accepted"
                ? "accepted"
                : "rejected"
            }`}
          >
            {application === "pending"
              ? "Pending Review"
              : application === "accepted"
              ? "Accepted"
              : "Rejected"}
          </p>
          <NavLink to="/documents" className="panel-link">
            Criteria for applications
          </NavLink>
        </div>
        <div className="panel-card">
          <h2>Requested Amount</h2>
          <p className="amount">
            ${Number(formData.requestAmount).toLocaleString("en-US")}
          </p>
          {/* onClick={() => changeAmount()} */}
          <div className="panel-link">Request Different Amount</div>
        </div>
        {application === "pending" ? (
          <div className="panel-card">
            <h2>Next Steps</h2>
            <ul>
              <li>We are reviewing your application</li>
              <li>You'll receive an email update</li>
              <li>Typical response: 24–48 hours</li>
            </ul>
          </div>
        ) : application === "accepted" ? (
          <div className="panel-card">
            <h2>Review Submission</h2>
            <ul>
              <li>Your application has been accepted</li>
              <li>Check your email for next steps</li>
              <li>Funds will be processed within 3-5 business days</li>
            </ul>
          </div>
        ) : (
          <div className="panel-card">
            <h2>Review Submission</h2>
            <ul>
              <li>Your application has been rejected.</li>
              <li>You'll receive an email update about why</li>
              <li>
                Resubmit your application here if you've entered wrong
                information or contact us directly
              </li>
            </ul>
          </div>
        )}
      </section>

      <section className="user-info-section">
        <div className="panel-card user-info-card">
          <h2>Your Information</h2>
          <div className="user-info-grid">
            <div className="info-item">
              <strong>Name:</strong> {formData.names.first}
              {formData.names.last}
            </div>
            <div className="info-item">
              <strong>Age:</strong> {formData.dob}
            </div>
            <div className="info-item">
              <strong>Requested:</strong> ${formData.requestAmount}
            </div>
            <div className="info-item">
              <strong>Purpose:</strong> {formData.purpose}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {formData.email}
            </div>
          </div>
        </div>
      </section>

      <footer className="user-panel-footer">
        <NavLink to="/" className="panel-link">
          <span>Start a New Request</span>
        </NavLink>
        <NavLink to="/about-us" className="panel-link">
          <span>Contact Us</span>
        </NavLink>
        <NavLink to="/contact-us" className="panel-link">
          <span>Contact Us</span>
        </NavLink>
        <NavLink to="/contact-us" className="panel-link">
          <span>Submit Bug</span>
        </NavLink>
      </footer>
    </div>
  );
}
