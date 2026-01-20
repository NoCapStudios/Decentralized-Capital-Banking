import { useForm } from "../../context/FormContext";
import "./Info.css";
import { selectStyle } from "../../context/constants";
import { FormControl, Select, MenuItem } from "@mui/material";

export function PartFour() {
  const { formData, setFormData } = useForm();

  return (
    <section className="info-form-section-part-four">
      <div className="info-field-group">
        <span className="info-field-label">
          Which structure of funding do you prefer?
        </span>
        <span className="info-field-sub-text">
          Choose the repayment model that works best for your hustle
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.fundingStructure.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                fundingStructure: {
                  ...p.fundingStructure,
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
              <span style={{ color: "#64748b" }}>Select funding structure</span>
            </MenuItem>
            <MenuItem value="markup">
              <span style={{ color: "#22d3ee", fontWeight: 600 }}>
                A | 30% Markup
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Borrow $X, Pay back $1.3X by fixed date
              </span>
            </MenuItem>
            <MenuItem value="revenue-share">
              <span style={{ color: "#a855f7", fontWeight: 600 }}>
                B | Revenue Share
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Share 5-8% of hustle revenue until $1.3X is paid
              </span>
            </MenuItem>
            <MenuItem value="profit-share">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>
                C | Profit Share
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Share agreed % of profit until paid back
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          How long do you want to take to pay it back?
        </span>
        <span className="info-field-sub-text">Maximum 10 months</span>
        <div className="info-ourpose-container">
          <input
            placeholder="Type A Timeframe 1 - 10 Months (Max)"
            value={formData.paybackTimeFrame}
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                paybackTimeFrame: e.target.value,
              }))
            }
            className="info-field-input"
          />
        </div>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          How often would you prefer to send payments?
        </span>
        <span className="info-field-sub-text">
          Choose your payment frequency
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.paybackFrequency.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                paybackFrequency: {
                  ...p.paybackFrequency,
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
              <span style={{ color: "#64748b" }}>Select frequency</span>
            </MenuItem>
            <MenuItem value="weekly">
              <span style={{ color: "#ef4444", fontWeight: 600 }}>Weekly</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Smaller, frequent payments
              </span>
            </MenuItem>
            <MenuItem value="bi-weekly">
              <span style={{ color: "#eab308", fontWeight: 600 }}>
                Bi-Weekly
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Every two weeks
              </span>
            </MenuItem>
            <MenuItem value="monthly">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>Monthly</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Once per month
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
}
