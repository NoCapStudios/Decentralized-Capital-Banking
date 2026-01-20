import { useForm } from "../../context/FormContext";
import "./Info.css";
import { formatMoney } from "../../pages/GetStarted/GetStarted";
import { selectStyle } from "../../context/constants";
import Slider from "@mui/material/Slider";
import { FormControl, Select, MenuItem } from "@mui/material";

interface PartThreeProps {
  index?: number;
  currentStep?: number;
}

export function PartThree({ index = 0, currentStep = 0 }: PartThreeProps) {
  const { formData, setFormData } = useForm();

  return (
    <section className="info-form-section-part-three">
      <div className="info-field-group">
        <span className="info-field-label">
          How much capital do you need right now? ($)
        </span>
        <span className="info-field-sub-text">10k Max for now...</span>
        <div className="info-slider-wrapper">
          <div className="info-slider-value">
            ${formatMoney(formData.requestAmount)}
          </div>
          <Slider
            value={formData.requestAmount}
            min={100}
            max={10000}
            step={10}
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
                background: "linear-gradient(90deg, #4adecfff, #10b981)",
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
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
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
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          What exactly will you spend it on?
        </span>
        <div className="info-purpose-container">
          <input
            placeholder="inventory, ads, tools, gas, - be specific as possible please."
            value={formData.purpose}
            onChange={(e) =>
              setFormData((p: any) => ({ ...p, purpose: e.target.value }))
            }
            className="info-field-input"
          />
        </div>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          How will this capital directly increase your profit?
        </span>
        <span className="info-field-sub-text">
          Example: I'll buy $1000 worth of inventory and resell for 40% markup
          and profit +$400/month
        </span>
        <div className="info-ourpose-container">
          <input
            placeholder=" Capital Increases"
            value={formData.increaseYourProfits}
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                increaseYourProfits: e.target.value,
              }))
            }
            className="info-field-input"
          />
        </div>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          When do you expect to see the impact of this capital?
        </span>
        <span className="info-field-sub-text">
          Timeline: 1 week, 2 weeks, 1 month etc:
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.whenCapitalImpact.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                whenCapitalImpact: {
                  ...p.whenCapitalImpact,
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
              <span style={{ color: "#64748b" }}>Select duration</span>
            </MenuItem>
            <MenuItem value="1M">
              <span style={{ color: "#22d3ee", fontWeight: 600 }}>Pro</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — 0 - 1 Months
              </span>
            </MenuItem>
            <MenuItem value="1TO3M">
              <span style={{ color: "#f97316", fontWeight: 600 }}>
                Trudging Along
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — 1 - 3 Months
              </span>
            </MenuItem>
            <MenuItem value="3TO6M">
              <span style={{ color: "#eab308", fontWeight: 600 }}>
                Rough beginnings
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — 3 - 6 Months{" "}
              </span>
            </MenuItem>
            <MenuItem value="year-plus">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>
                Fresh start
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>— A Year+</span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          What's your realistic monthly profit after this investment?
        </span>
        <span className="info-field-sub-text">
          Calculate the current income - costs - capital payback
        </span>
        <div className="info-projected-container">
          <input
            placeholder="Monthly profit(s) after funding"
            value={formData.projectedMonthlyProfit}
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                projectedMonthlyProfit: e.target.value,
              }))
            }
            className="info-field-input"
          />
        </div>
      </div>
    </section>
  );
}
