import { useForm } from "../../context/FormContext";
import "./Info.css";
import { selectStyle } from "../../context/constants";
import Slider from "@mui/material/Slider";
import { FormControl, Select, MenuItem } from "@mui/material";

interface PartFiveProps {
  index?: number;
  currentStep?: number;
}

export function PartFive({ index = 0, currentStep = 0 }: PartFiveProps) {
  const { formData, setFormData } = useForm();

  return (
    <section className="info-form-section-part-five">
      <div className="info-field-group">
        <span className="info-field-label">
          Do you currently have any outstanding debt?
        </span>
        <span className="info-field-sub-text">
          This helps us understand your current obligations
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.anyDebt.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                anyDebt: {
                  ...p.anyDebt,
                  type: e.target.value,
                },
              }))
            }
            sx={selectStyle}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: "#0e0f0f",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  mt: 1,
                },
              },
            }}
          >
            <MenuItem value="">
              <span style={{ color: "#64748b" }}>Select option</span>
            </MenuItem>
            <MenuItem value="YES">
              <span style={{ color: "#eab308", fontWeight: 600 }}>Yes</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — I have existing debt
              </span>
            </MenuItem>
            <MenuItem value="NO">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>No</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Debt-free
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          What's your approximate credit score?
        </span>
        <span className="info-field-sub-text">
          Don't worry if it's not perfect - we fund based on your hustle, not
          just your score
        </span>
        <div className="info-slider-wrapper">
          <div className="info-slider-value-credit">
            {formData.creditScore}
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                marginLeft: "8px",
                color: "white",
                opacity: 0.7,
              }}
            >
              {formData.creditScore >= 750 ? (
                <span style={{ color: "#ab64e5ff" }}>Excellent</span>
              ) : formData.creditScore >= 700 ? (
                <span style={{ color: "#22c55e" }}>Good</span>
              ) : formData.creditScore >= 650 ? (
                <span style={{ color: "#eab308" }}>Fair</span>
              ) : formData.creditScore >= 600 ? (
                <span style={{ color: "#ef4444" }}>Below Average</span>
              ) : (
                <span style={{ color: "#b01b1bff" }}>Poor</span>
              )}
            </span>
          </div>
          <Slider
            value={formData.creditScore}
            min={300}
            max={850}
            step={5}
            valueLabelDisplay="off"
            disabled={index !== currentStep}
            onChange={(_, value) =>
              setFormData((prev) => ({
                ...prev,
                creditScore: value as number,
              }))
            }
            sx={{
              width: "100%",
              py: 1.5,

              "& .MuiSlider-track": {
                height: 6,
                borderRadius: 6,
                background:
                  formData.creditScore >= 750
                    ? "linear-gradient(90deg, #ab64e5ff, #1094b9ff)"
                    : formData.creditScore >= 700
                      ? "linear-gradient(90deg, #22c55e, #10b981)"
                      : formData.creditScore >= 650
                        ? "linear-gradient(90deg, #eab308, #f59e0b)"
                        : "linear-gradient(90deg, #ef4444, #f97316)",
                border: "none",
              },

              "& .MuiSlider-rail": {
                opacity: 0.3,
                background: "linear-gradient(#4b5563, #374151)",
              },

              "& .MuiSlider-thumb": {
                width: 32,
                height: 16,
                borderRadius: 2,
                backgroundColor: "#fff",
                border: "2px solid #305e49",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              },

              "&.Mui-disabled": {
                opacity: 0.4,
              },
            }}
          />
        </div>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          Are you involved in any legal disputes or lawsuits?
        </span>
        <span className="info-field-sub-text">
          We need to know about any active legal matters
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.legalDisputes.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                legalDisputes: {
                  ...p.legalDisputes,
                  type: e.target.value,
                },
              }))
            }
            sx={selectStyle}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: "#0e0f0f",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  mt: 1,
                },
              },
            }}
          >
            <MenuItem value="">
              <span style={{ color: "#64748b" }}>Select option</span>
            </MenuItem>
            <MenuItem value="YES">
              <span style={{ color: "#ef4444", fontWeight: 600 }}>Yes</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Active legal matters
              </span>
            </MenuItem>
            <MenuItem value="NO">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>No</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — No legal issues
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          Have you used a similar funding platform before?
        </span>
        <span className="info-field-sub-text">
          Tell us about your experience with alternative funding
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.experienceWithApp.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                experienceWithApp: {
                  ...p.experienceWithApp,
                  type: e.target.value,
                },
              }))
            }
            sx={selectStyle}
            MenuProps={{
              PaperProps: {
                sx: {
                  background: "#0e0f0f",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  mt: 1,
                },
              },
            }}
          >
            <MenuItem value="">
              <span style={{ color: "#64748b" }}>Select option</span>
            </MenuItem>
            <MenuItem value="YES">
              <span style={{ color: "#3b82f6", fontWeight: 600 }}>Yes</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — I've used similar platforms
              </span>
            </MenuItem>
            <MenuItem value="NO">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>No</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — This is my first time
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
}
