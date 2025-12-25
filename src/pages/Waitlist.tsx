import { useState, type FormEvent } from "react";
import { Header } from "../components/common/Header";
import "../styles/Waitlist.css";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("https://formspree.io/f/xykgrrgp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      }
    } catch {}
  };

  return (
    <div className="waitlist-root">
      <title>FlowCap | Waitlist</title>
      <Header />

      <main className="waitlist-shell">
        <div className="waitlist-background">
          <div className="waitlist-orb orb-a"></div>
          <div className="waitlist-orb orb-b"></div>
          <div className="waitlist-orb orb-c"></div>
        </div>

        <section className="waitlist-card">
          <span className="badge">Launch Notice</span>
          <h1 className="waitlist-title">Join the early access list</h1>
          <p className="waitlist-copy">
            Drop your email to get a one-time note when FlowCap opens new spots.
            No spam, just the green light.
          </p>

          <form className="waitlist-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="waitlist-email">
              Email address
            </label>
            <div className="form-row">
              <input
                id="waitlist-email"
                type="email"
                name="email"
                placeholder="you@startup.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Notify me</button>
            </div>
          </form>

          {status === "success" && (
            <div className="confirmation">
              You are on the list. We will email you as soon as we launch.
            </div>
          )}

          <div className="waitlist-meta">
            <div className="meta-pill">No credit card</div>
            <div className="meta-pill">One-click unsubscribe</div>
            <div className="meta-pill">Exclusive beta perks</div>
          </div>
        </section>
      </main>
    </div>
  );
}
