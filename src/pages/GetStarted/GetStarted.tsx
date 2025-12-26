import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import Slider from "@mui/material/Slider";
import { useForm } from "../../context/FormContext";
import "../../styles/GetStarted.css";
import "../../styles/Slider.css";

const formatMoney = (n: number) => n.toLocaleString("en-US");

export function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const fields = [
    {
      key: "Names",
      label: "First, Last, & Prefered Name",
      type: "group",
      placeholders: { first: "John", last: "Doe", prefered: "Johnson" },
    },
    { key: "age", label: "Age", type: "slider" },
    {
      key: "requestAmount",
      label: "How much would you like to request?",
      type: "slider",
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

  const handleNext = () => {
    if (fields[currentStep].key === "age" && formData.age < 18) {
      alert("Minimum age is 18");
      return;
    }

    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") handleNext();
  };

  const isEmpty = (v: string) => !v.trim();

  const validateForm = () => {
    const errors: string[] = [];

    const { first, last, prefered } = formData.names;

    if (isEmpty(first)) errors.push("First name is missing");
    if (isEmpty(last)) errors.push("First name is missing");
    if (isEmpty(prefered)) errors.push("First name is missing");

    if (formData.age < 18) errors.push("You must be at least 18");
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

  const getFieldStyle = (index: number) => {
    const diff = index - currentStep;

    if (diff === 0)
      return { transform: "translateY(0) scale(1)", opacity: 1, zIndex: 10 };
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

        <div className="carousel-fields">
          {fields.map((field, index) => (
            <div
              key={field.key}
              className="field-wrapper"
              style={getFieldStyle(index)}
            >
              <div className="field-card">
                <label className="field-label">{field.label}</label>

                {field.key === "age" && (
                  <>
                    <div className="slider-wrapper">
                      <div className="slider-value">{formData.age}</div>
                      <Slider
                        value={formData.age}
                        min={18}
                        max={100}
                        step={1}
                        valueLabelDisplay="off"
                        disabled={index !== currentStep}
                        onChange={(_, value) =>
                          setFormData((prev) => ({
                            ...prev,
                            age: value as number,
                          }))
                        }
                        sx={{
                          width: "100%",
                          py: 1.5,

                          "& .MuiSlider-track": {
                            height: 6,
                            borderRadius: 6,
                            background:
                              "linear-gradient(90deg, #4adecfff, #10b981)",
                            border: "none",
                          },

                          "& .MuiSlider-rail": {
                            opacity: 0.3,
                            background: "linear-gradient(#37ea9aff, #305e49)",
                          },

                          "& .MuiSlider-thumb": {
                            width: 32,
                            height: 16,
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            border: "2px solid #305e49",
                            transition:
                              "transform 0.15s ease, box-shadow 0.15s ease",
                          },

                          "& .MuiSlider-mark": {
                            width: 19,
                            height: 19,
                            borderRadius: "50%",
                            backgroundColor: "#111",
                            opacity: 0.25,
                          },

                          "& .MuiSlider-markActive": {
                            opacity: 1,
                          },

                          "&.Mui-disabled": {
                            opacity: 0.4,
                          },
                        }}
                      />
                    </div>
                  </>
                )}

                {field.key === "requestAmount" && (
                  <>
                    <div className="slider-wrapper">
                      <div className="slider-value">
                        ${formatMoney(formData.requestAmount)}
                      </div>
                      <Slider
                        value={formData.requestAmount}
                        min={100}
                        max={10000}
                        step={25}
                        valueLabelDisplay="off"
                        valueLabelFormat={(v) => `$${formatMoney(v)}`}
                        disabled={index !== currentStep}
                        onChange={(_, value) =>
                          setFormData((prev) => ({
                            ...prev,
                            requestAmount: value as number,
                          }))
                        }
                        sx={{
                          width: "100%",
                          py: 1.5,

                          "& .MuiSlider-track": {
                            height: 6,
                            borderRadius: 6,
                            background:
                              "linear-gradient(90deg, #4adecfff, #10b981)",
                            border: "none",
                          },

                          "& .MuiSlider-rail": {
                            opacity: 0.3,
                            background: "linear-gradient(#37ea9aff, #305e49)",
                          },

                          "& .MuiSlider-thumb": {
                            width: 32,
                            height: 16,
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            border: "2px solid #305e49",
                            transition:
                              "transform 0.15s ease, box-shadow 0.15s ease",
                          },

                          "& .MuiSlider-mark": {
                            width: 19,
                            height: 19,
                            borderRadius: "50%",
                            backgroundColor: "#111",
                            opacity: 0.25,
                          },

                          "& .MuiSlider-markActive": {
                            opacity: 1,
                          },

                          "&.Mui-disabled": {
                            opacity: 0.4,
                          },
                        }}
                      />
                    </div>
                  </>
                )}

                {(field.key === "purpose" || field.key === "email") && (
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    onKeyPress={handleKeyPress}
                    placeholder={field.placeholder}
                    disabled={index !== currentStep}
                    className="field-input"
                  />
                )}

                {field.key === "Names" && (
                  <div className="name-container">
                    <input
                      type={field.type}
                      value={formData.names.first}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          names: { ...prev.names, first: e.target.value },
                        }))
                      }
                      onKeyPress={handleKeyPress}
                      placeholder={field.placeholders?.first}
                      disabled={index !== currentStep}
                      className="field-input first"
                    />
                    <input
                      type={field.type}
                      value={formData.names.last}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          names: { ...prev.names, last: e.target.value },
                        }))
                      }
                      onKeyPress={handleKeyPress}
                      placeholder={field.placeholders?.last}
                      disabled={index !== currentStep}
                      className="field-input last"
                    />
                    <input
                      type={field.type}
                      value={formData.names.prefered}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          names: { ...prev.names, prefered: e.target.value },
                        }))
                      }
                      onKeyPress={handleKeyPress}
                      placeholder={field.placeholders?.prefered}
                      disabled={index !== currentStep}
                      className="field-input preferred"
                    />
                    <div className="slider-wrapper"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
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
