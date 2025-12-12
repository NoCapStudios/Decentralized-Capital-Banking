import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./GetStarted.css";

export function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    requestAmount: "",
    purpose: "",
    email: "",
  });

  const fields = [
    {
      key: "firstName",
      label: "First name",
      type: "text",
      placeholder: "John",
    },
    {
      key: "lastName",
      label: "Last name",
      type: "text",
      placeholder: "Doe",
    },
    {
      key: "age",
      label: "Age",
      type: "number",
      placeholder: "25",
    },
    {
      key: "requestAmount",
      label: "How much would you like to request?",
      type: "number",
      placeholder: "$5,000",
    },
    {
      key: "purpose",
      label: "What's the purpose?",
      type: "text",
      placeholder: "Business expansion",
    },
    {
      key: "email",
      label: "What's your email?",
      type: "email",
      placeholder: "john@example.com",
    },
  ];

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && currentStep < fields.length - 1) {
      handleNext();
    }
  };

  const getFieldStyle = (index) => {
    const diff = index - currentStep;

    if (diff === 0) {
      return {
        transform: "translateY(0) scale(1)",
        opacity: 1,
        zIndex: 10,
      };
    } else if (diff === 1) {
      return {
        transform: "translateY(140px) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };
    } else if (diff === -1) {
      return {
        transform: "translateY(-140px) scale(0.85)",
        opacity: 0.5,
        zIndex: 5,
      };
    } else {
      return {
        transform: `translateY(${diff * 160}px) scale(0.7)`,
        opacity: 0,
        zIndex: 0,
      };
    }
  };
  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="progress-section">
          <div className="progress-text">
            Step {currentStep + 1} of {fields.length}
          </div>
          <div className="progress-bars">
            {fields.map((_, index) => (
              <div
                key={index}
                className={`progress-bar ${
                  index === currentStep
                    ? "progress-bar-active"
                    : index < currentStep
                    ? "progress-bar-complete"
                    : "progress-bar-inactive"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="carousel-fields">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="field-wrapper"
              style={getFieldStyle(index)}
            >
              <div className="field-card">
                <label className="field-label">{field.label}</label>
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={field.placeholder}
                  disabled={index !== currentStep}
                  className="field-input"
                />
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
              <button
                onClick={() => console.log("Form submitted:", formData)}
                className="submit-button"
              >
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
