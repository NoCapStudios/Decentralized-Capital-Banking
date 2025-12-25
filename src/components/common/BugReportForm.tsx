import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./BugReportForm.css";

export function BugReportForm() {
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
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://formspree.io/f/mwvedoqo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        navigate("/bug-submitted"); // Redirect to your custom page
      } else {
        console.error("Form submission error", await res.json());
        alert("There was an error submitting your bug report.");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your bug report.");
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
        <label>Bug Title</label>
        <input name="title" placeholder="Short summary of the issue" required />
      </div>

      <div className="bug-form-group">
        <label>Steps to Reproduce</label>
        <textarea
          name="reproduction_steps"
          placeholder={`1. Go to...\n2. Click...\n3. Error appears...`}
          rows={5}
          required
        />
      </div>

      <div className="bug-form-group">
        <label>Expected Behavior</label>
        <textarea
          name="expected_behavior"
          placeholder="What should have happened instead?"
          rows={4}
        />
      </div>

      <button className="bug-submit-btn" type="submit">
        Submit Bug Report
      </button>
    </form>
  );
}
