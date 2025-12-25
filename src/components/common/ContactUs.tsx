import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./ContactUs.css";

export function ContactUs() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("applicationData");
    if (!saved) return;

    const { email } = JSON.parse(saved);
    if (!email) return;

    fetch(`/api/bug/${encodeURIComponent(email)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formspree.io/f/xeejyyar", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        navigate("/contact-submitted");
      } else {
        console.error("Form submission error", await res.json());
        alert("There was an error submitting your request.");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your request.");
    }
  };

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <div className="bug-form-group">
        <label>Name</label>
        <input name="name" defaultValue={user?.name ?? ""} required />
      </div>

      <div className="bug-form-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          defaultValue={user?.email ?? ""}
          required
        />
      </div>

      <div className="bug-form-group">
        <label>Suggestion/Request</label>
        <input name="title" placeholder="Short summary of the issue" required />
      </div>

      <div className="bug-form-group">
        <label>Description</label>
        <textarea
          name="reproduction_steps"
          placeholder={`What would you like us to know?`}
          rows={4}
          required
        />
      </div>

      <div className="bug-form-group">
        <label>Additional Comments</label>
        <textarea
          name="expected_behavior"
          placeholder="Any additional comments?"
          rows={4}
        />
      </div>

      <button className="bug-submit-btn" type="submit">
        Submit Suggestion
      </button>
    </form>
  );
}
