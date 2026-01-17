import { useState } from "react";
import { useNavigate } from "react-router";
import { PartOne } from "../../components/common/PartOne";
import { PartTwo } from "../../components/common/PartTwo";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useForm } from "../../context/FormContext";
import "../../styles/GetStarted.css";
import "../../styles/Slider.css";
import { CSSProperties } from "@mui/material/styles";

export const formatMoney = (n: number) => n.toLocaleString("en-US");

export function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const fields = [
    {
      key: "PartOne",
      label: "Personal Information",
      type: "section",
    },
    {
      key: "PartTwo",
      label: "Income Information",
      type: "section",
    },
    {
      key: "PartThree",
      label: "",
      type: "section",
    },
  ];

  const MIN_AGE = 18;

  const getAgeFromDob = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  const handleNext = () => {
    if (fields[currentStep].key === "dob") {
      if (!formData.dob) {
        alert("Date of birth is required");
        return;
      }

      if (getAgeFromDob(formData.dob) < MIN_AGE) {
        alert("You must be at least 18 years old");
        return;
      }
    }

    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      if (currentStep < fields.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const isEmpty = (v: string) => !v.trim();

  const validateForm = () => {
    const errors: string[] = [];

    const { first, last, preferred } = formData.names;

    if (isEmpty(first)) errors.push("First name is missing");
    if (isEmpty(last)) errors.push("First name is missing");
    if (preferred && isEmpty(preferred)) errors.push("First name is missing");

    if (!formData.dob) errors.push("Date of birth is required");
    if (getAgeFromDob(formData.dob) < MIN_AGE)
      errors.push("You must be at least 18 years old");
    if (!formData.requestAmount) errors.push("Requested amount is missing");
    if (!formData.purpose.trim()) errors.push("Purpose is missing");
    if (!formData.email.trim()) errors.push("Email is missing");

    return errors;
  };

  const fieldChecks = async () => {
    const errors = validateForm();
    if (errors.length) {
      errors.forEach((e) => alert(e));
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      alert("Application submitted!");
      navigate("/user-panel");
    } catch {
      alert("Failed to submit application");
    }
  };

  const getFieldStyle = (index: number): CSSProperties => {
    const diff = index - currentStep;

    if (diff === 0)
      return {
        transform: "translateY(0) scale(1)",
        opacity: 1,
        zIndex: 10,
      };
    if (diff === 1)
      return {
        transform: "translateY(140px) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };
    if (diff === -1)
      return {
        transform: "translateY(-140px) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };

    return {
      transform: `translateY(${diff * 160}px) scale(0.7)`,
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="progress-section">
          <div className="progress-text">
            Step {currentStep + 1} of {fields.length}
          </div>
          <div className="progress-bars">
            {fields.map((_, i) => (
              <div
                key={i}
                className={`progress-bar ${
                  i === currentStep
                    ? "progress-bar-active"
                    : i < currentStep
                    ? "progress-bar-complete"
                    : "progress-bar-inactive"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="carousel-fields" onKeyDown={handleKeyPress}>
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="field-wrapper"
              style={getFieldStyle(index)}
            >
              <div className="field-card">
                <label className="field-label">{field.label}</label>
                {field.key === "PartOne" && <PartOne />}
                {field.key === "PartTwo" && (
                  <PartTwo index={index} currentStep={currentStep} />
                )}
                {/* {field.key === "PartThree" && <PartThree />} */}
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-section">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="nav-button"
          >
            <ChevronUp className="nav-icon" />
          </button>

          <div className="nav-hint">
            {currentStep === fields.length - 1 ? (
              <button onClick={fieldChecks} className="submit-button">
                Submit
              </button>
            ) : (
              <span>Press Enter or ↓</span>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentStep === fields.length - 1}
            className="nav-button"
          >
            <ChevronDown className="nav-icon" />
          </button>
        </div>

        <div className="keyboard-hint">
          Use arrow keys or click buttons to navigate
        </div>
      </div>
    </div>
  );
}
