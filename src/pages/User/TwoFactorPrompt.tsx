import React from "react";
import { useLocation, useNavigate } from "react-router";
import "../../styles/Auth.css";

interface TwoFactorLocationState {
  email?: string;
}

export const TwoFactorPrompt: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as TwoFactorLocationState) || {};
  const emailLabel = state.email ? `for ${state.email}` : "";

  const handleEnable = () => {
    navigate("/two-factor", { replace: true });
  };

  // routes to home page
  const handleSkip = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="pill">Security</span>
          <h1>Enable two-factor authentication?</h1>
          <p>
            Add an extra layer of protection {emailLabel}. You can set this up
            now or skip and do it later from your account security settings.
          </p>
        </div>

        <div className="divider">
          <span>Choose an option</span>
        </div>

        <div className="auth-form">
          <button
            type="button"
            className="primary-action"
            onClick={handleEnable}
          >
            Set up 2FA now
          </button>
          <button type="button" className="ghost-btn" onClick={handleSkip}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorPrompt;
