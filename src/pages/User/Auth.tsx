import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "../../styles/Auth.css";
import { supabase } from "../../api/supabase";

type AuthMode = "login" | "signup";

const FIRST_LOGIN_FLAG = "flowcap_first_login";

interface AuthFormState {
  email: string;
  password: string;
  confirmPassword: string;
  remember: boolean;
}

export const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<AuthFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [phoneStep, setPhoneStep] = useState<"phone" | "code">("phone");
  const [phoneDigits, setPhoneDigits] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("1");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [phoneMessage, setPhoneMessage] = useState<string>("");
  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);
  const [resendIn, setResendIn] = useState<number>(0);

  const phoneCountries = [
    { code: "1", label: "United States / Canada (+1)", mask: [3, 3, 4] },
  ];

  const markFirstLoginPending = (email: string) => {
    try {
      localStorage.setItem(
        FIRST_LOGIN_FLAG,
        JSON.stringify({ email, pending: true })
      );
    } catch (err) {
      console.warn("Failed to persist first-login flag", err);
    }
  };

  const consumeFirstLoginPending = (email: string) => {
    try {
      const raw = localStorage.getItem(FIRST_LOGIN_FLAG);
      if (!raw) return false;
      const parsed = JSON.parse(raw) as { email?: string; pending?: boolean };
      if (!parsed.pending || parsed.email !== email) return false;
      localStorage.removeItem(FIRST_LOGIN_FLAG);
      return true;
    } catch (err) {
      console.warn("Failed to read first-login flag", err);
      return false;
    }
  };

  const formatPhoneDisplay = (digits: string, code: string) => {
    const country =
      phoneCountries.find((c) => c.code === code) || phoneCountries[0];
    const parts: string[] = [];
    let idx = 0;
    for (const len of country.mask) {
      const slice = digits.slice(idx, idx + len);
      if (!slice) break;
      parts.push(slice);
      idx += len;
    }
    const remainder = digits.slice(idx);
    if (remainder) parts.push(remainder);
    return parts.join("-");
  };

  const buildE164 = (digits: string, code: string) => {
    const clean = digits.replace(/\D/g, "");
    if (!clean) return "";
    return `+${code}${clean}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (mode === "signup" && form.password !== form.confirmPassword) {
      setStatus("Passwords need to match.");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        mode === "login"
          ? "http://localhost:3001/api/auth/login"
          : "http://localhost:3001/api/auth/signup";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const payload = await response.json().catch(() => ({}));

      console.debug("Auth response", {
        mode,
        status: response.status,
        ok: response.ok,
        payload,
      });
      if (!response.ok) {
        const label = mode === "login" ? "Login" : "Signup";
        setStatus(
          payload.error ||
            `${label} request failed (${response.status} ${
              response.statusText || "unknown"
            }).`
        );
        return;
      }

      if (mode === "signup") {
        markFirstLoginPending(form.email);
        setStatus(
          payload.message ||
            `Signup request accepted (status ${response.status}). Check your email to confirm.`
        );
        return;
      }

      const fromVerifyLink = Boolean(searchParams.get("verified"));
      const shouldPrompt2FA = consumeFirstLoginPending(form.email);
      if (shouldPrompt2FA || fromVerifyLink) {
        navigate("/two-factor", { state: { email: form.email } });
        return;
      }

      setStatus(payload.message || `Logged in (status ${response.status}).`);
      navigate("/get-started");
    } catch (error) {
      console.error(error);
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStatus("");
  };

  const isSignup = mode === "signup";

  const handleGoogle = async () => {
    setStatus("");
    setLoading(true);
    try {
      console.debug("Google sign-in start");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error("Google sign-in failed", error);
        setStatus(error.message || "Google sign-in failed.");
        setLoading(false);
      }
      // Supabase will redirect; no further action needed here
    } catch (err) {
      console.error(err);
      setStatus("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleOpenPhone = () => {
    setPhoneMessage("");
    setPhoneDigits("");
    setPhoneCode("");
    setPhoneStep("phone");
    setShowPhoneModal(true);
    console.debug("Phone modal opened");
  };

  const handleSendPhoneCode = async () => {
    const e164 = buildE164(phoneDigits, selectedCountry);
    if (!e164) {
      setPhoneMessage("Enter a phone number.");
      return;
    }
    setPhoneMessage("");
    setPhoneLoading(true);
    console.debug("OTP send attempt", { e164, selectedCountry });
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: e164,
      });

      if (error) {
        console.error("OTP send failed", { e164, error });
        setPhoneMessage(
          `Send failed (signInWithOtp): ${error.message || "unknown error"}`
        );
      } else {
        console.debug("OTP send success", { e164, data });
        setPhoneMessage(`Code sent to ${e164}. Check your SMS.`);
        setPhoneStep("code");
        setResendIn(120);
      }
    } catch (err) {
      console.error(err);
      setPhoneMessage("Network error. Please try again.");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyPhoneCode = async () => {
    const e164 = buildE164(phoneDigits, selectedCountry);
    if (!e164 || !phoneCode) {
      setPhoneMessage("Enter the code sent to your phone.");
      return;
    }
    setPhoneLoading(true);
    try {
      console.debug("OTP verify attempt", { e164, token: phoneCode });
      const { data, error } = await supabase.auth.verifyOtp({
        phone: e164,
        token: phoneCode,
        type: "sms",
      });

      if (error) {
        console.error("OTP verify failed", { e164, error });
        setPhoneMessage(
          `Verification failed (verifyOtp): ${error.message || "unknown error"}`
        );
      } else {
        console.debug("OTP verify success", { e164, data });
        setPhoneMessage(
          `Phone verified via SMS. Session ${
            data.session ? "returned" : "not returned"
          }.`
        );
        setStatus("Phone verified. You are logged in.");
        if (data.session) {
          // session available; could store tokens if needed
        }
        setShowPhoneModal(false);
      }
    } catch (err) {
      console.error(err);
      setPhoneMessage("Network error. Please try again.");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendIn > 0) return;
    console.debug("OTP resend requested");
    await handleSendPhoneCode();
  };

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setInterval(() => {
      setResendIn((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified) {
      setMode("login");
      setStatus("Email verified, log in to continue.");
    }
  }, [searchParams]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="pill">
            {isSignup ? "New to FlowCap" : "Welcome back"}
          </span>
          <h1>
            {isSignup ? "Create your access" : "Access your capital cockpit"}
          </h1>
          <p>
            Securely manage decentralized capital flows with your FlowCap
            account. Toggle below to sign up or log in.
          </p>
        </div>

        <div className="alt-actions">
          <button
            type="button"
            className="alt-btn google"
            onClick={handleGoogle}
            disabled={loading}
          >
            <span className="alt-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.23c0-.71-.06-1.22-.19-1.75H12v3.17h5.18c-.1.79-.64 1.98-1.83 2.78l-.02.14 2.66 2.06.18.02c1.67-1.54 2.63-3.8 2.63-6.42Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 22c2.43 0 4.47-.8 5.96-2.18l-2.84-2.19c-.76.53-1.78.9-3.12.9-2.39 0-4.41-1.54-5.13-3.67l-.13.01-2.78 2.15-.04.13C5.59 19.98 8.57 22 12 22Z"
                  fill="#34A853"
                />
                <path
                  d="M6.87 14.86A5.98 5.98 0 0 1 6.55 12c0-.99.18-1.95.31-2.86l-.01-.13-2.82-2.19-.09.04A9.91 9.91 0 0 0 3 12c0 1.66.4 3.22 1.1 4.59l2.77-2.73Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.92c1.69 0 2.82.73 3.47 1.34l2.53-2.47C16.46 3.2 14.43 2.3 12 2.3 8.57 2.3 5.59 4.32 4.1 7.41l2.76 2.16C7.59 7.46 9.61 5.92 12 5.92Z"
                  fill="#EA4335"
                />
              </svg>
            </span>
            <span>Sign in with Google</span>
          </button>
          <button
            type="button"
            className="alt-btn phone"
            onClick={handleOpenPhone}
            disabled={loading}
          >
            <span className="alt-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="2"
                  width="12"
                  height="20"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="18" r="1.2" fill="currentColor" />
                <rect
                  x="9"
                  y="5"
                  width="6"
                  height="1.4"
                  rx="0.7"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>Sign in with number</span>
          </button>
        </div>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        {showPhoneModal && (
          <div className="modal-backdrop">
            <div className="modal-card">
              <h3>
                {phoneStep === "phone"
                  ? "Sign in with phone"
                  : "Enter verification code"}
              </h3>
              <p className="helper-text">
                {phoneStep === "phone"
                  ? "We will send a one-time code to your mobile number."
                  : "Enter the 6-digit code we just sent to your phone."}
              </p>

              {phoneStep === "phone" ? (
                <div className="modal-field">
                  <label>Phone number</label>
                  <div className="phone-row">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      disabled={phoneLoading}
                    >
                      {phoneCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+{selectedCountry}</span>
                      <input
                        type="tel"
                        placeholder="123-456-7890"
                        value={formatPhoneDisplay(phoneDigits, selectedCountry)}
                        onChange={(e) =>
                          setPhoneDigits(
                            e.target.value.replace(/\D/g, "").slice(0, 15)
                          )
                        }
                        disabled={phoneLoading}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="modal-field">
                  <label>Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                  />
                </div>
              )}

              {phoneMessage && (
                <div className="status-message inline">{phoneMessage}</div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setShowPhoneModal(false)}
                  disabled={phoneLoading}
                >
                  Cancel
                </button>
                {phoneStep === "phone" ? (
                  <button
                    type="button"
                    className="primary-action"
                    onClick={handleSendPhoneCode}
                    disabled={phoneLoading}
                  >
                    {phoneLoading ? "Sending..." : "Send code"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="primary-action"
                    onClick={handleVerifyPhoneCode}
                    disabled={phoneLoading}
                  >
                    {phoneLoading ? "Verifying..." : "Verify code"}
                  </button>
                )}
              </div>

              {phoneStep === "code" && (
                <div className="resend-row">
                  <span className="helper-text">Didn&apos;t receive it?</span>
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={handleResend}
                    disabled={phoneLoading || resendIn > 0}
                  >
                    {resendIn > 0
                      ? `Send again in ${formatSeconds(resendIn)}`
                      : "Send again"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {isSignup && (
            <label className="field">
              <span>Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
          )}

          {!isSignup && (
            <label className="remember">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
          )}

          {status && <div className="status-message">{status}</div>}

          <button type="submit" className="primary-action" disabled={loading}>
            {loading ? "Working..." : isSignup ? "Create account" : "Log in"}
          </button>
        </form>

        <div className="auth-switch">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button onClick={() => switchMode("login")}>Log in</button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <button onClick={() => switchMode("signup")}>Sign up</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
