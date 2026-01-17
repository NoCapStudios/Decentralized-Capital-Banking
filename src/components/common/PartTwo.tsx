import { useForm } from "../../context/FormContext";
import "./Info.css";
import { formatMoney } from "../../pages/GetStarted/GetStarted";
import { selectStyle } from "../../context/constants";
import Slider from "@mui/material/Slider";
import { FormControl, Select, MenuItem } from "@mui/material";

interface PartTwoProps {
  index?: number;
  currentStep?: number;
}

export function PartTwo({ index = 0, currentStep = 0 }: PartTwoProps) {
  const { formData, setFormData } = useForm();

  return (
    <section className="info-form-section-part-two">
      <div className="info-field-group">
        <span className="info-field-label">What's your income source?</span>
        <FormControl fullWidth>
          <Select
            value={formData.incomeSource.type}
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                incomeSource: {
                  ...p.incomeSource,
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
              <span style={{ color: "#64748b" }}>Select income source</span>
            </MenuItem>
            <MenuItem value="traditional-employment">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                Traditional employment
              </span>
            </MenuItem>
            <MenuItem value="driver-shopper">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                Delivery Driver/Shopper
              </span>
            </MenuItem>
            <MenuItem value="freelancing">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                Freelancing
              </span>
            </MenuItem>
            <MenuItem value="reselling">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>Reselling</span>
            </MenuItem>
            <MenuItem value="content-creator">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                Content Creator
              </span>
            </MenuItem>
            <MenuItem value="e-commerce">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                E-Commerce
              </span>
            </MenuItem>
            <MenuItem value="no-hustle-gig">
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                I don't have a hustle/Gig
              </span>
            </MenuItem>
            <MenuItem value="other">
              <span style={{ color: "#6682a7ff", marginLeft: 6 }}>— Other</span>
            </MenuItem>
          </Select>
          {formData.incomeSource.type === "other" && (
            <div className="fade-in">
              <input
                placeholder="Please specify"
                value={formData.incomeSource.other || ""}
                onChange={(e) =>
                  setFormData((p: any) => ({
                    ...p,
                    incomeSource: {
                      ...p.incomeSource,
                      other: e.target.value,
                    },
                  }))
                }
                className="sub-input"
              />
            </div>
          )}
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          How long have you been doing this hustle?
        </span>
        <FormControl fullWidth>
          <Select
            value={formData.incomeLength.type}
            displayEmpty
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                incomeLength: {
                  ...p.incomeLength,
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
            <MenuItem value="month-less">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>
                Fresh start
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — A month or less
              </span>
            </MenuItem>
            <MenuItem value="month-year">
              <span style={{ color: "#eab308", fontWeight: 600 }}>
                Rough beginnings
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — A couple of months to a year
              </span>
            </MenuItem>
            <MenuItem value="couple-years">
              <span style={{ color: "#f97316", fontWeight: 600 }}>
                Trudging Along
              </span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — A couple of years
              </span>
            </MenuItem>
            <MenuItem value="five-years-plus">
              <span style={{ color: "#22d3ee", fontWeight: 600 }}>Pro</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Five years +
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="info-field-group">
        <span className="info-field-label">
          Approximately how much do you make per month from said hustle/income
          source?
        </span>
        <span className="info-field-sub-text">
          Could be an exact amount or average~
        </span>
        <div className="info-slider-wrapper">
          <div className="info-slider-value">
            ${formatMoney(formData.incomeAmount)}/Month
          </div>
          <Slider
            value={formData.incomeAmount}
            min={100}
            max={10000}
            step={25}
            valueLabelDisplay="off"
            valueLabelFormat={(v) => `$${formatMoney(v)}`}
            disabled={index !== currentStep}
            onChange={(_, value) =>
              setFormData((prev) => ({
                ...prev,
                incomeAmount: value as number,
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
        <span className="info-field-label">How consistent is that income?</span>
        <FormControl fullWidth>
          <Select
            value={formData.incomeConsistency.type}
            onChange={(e) =>
              setFormData((p: any) => ({
                ...p,
                incomeConsistency: {
                  ...p.incomeConsistency,
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
            <MenuItem value="very-inconsistent">
              <span style={{ color: "#f97316", fontWeight: 600 }}>Poor</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Very Inconsistent
              </span>
            </MenuItem>
            <MenuItem value="Variable">
              <span style={{ color: "#eab308", fontWeight: 600 }}>Average</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>— Stable</span>
            </MenuItem>
            <MenuItem value="Very Consistent">
              <span style={{ color: "#22c55e", fontWeight: 600 }}>Pro</span>
              <span style={{ color: "#94a3b8", marginLeft: 6 }}>
                — Very Consistent
              </span>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="info-field-group">
        <span className="info-field-label">
          Upload a recent bank or payment statement that shows your hustle
          income/revenue
        </span>
        <span className="info-field-sub-text">
          You can upload a screenshot from your bank, card, or business
          dashboard. Please hide or blur any sensitive account details.
        </span>

        <input
          type="file"
          accept="image/*"
          className="info-file-input"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const previewUrl = URL.createObjectURL(file);
            setFormData((p: any) => ({
              ...p,
              bankStatementPicture: {
                previewUrl,
                uploading: true,
              },
            }));

            try {
              const reader = new FileReader();
              reader.onload = async (event) => {
                const base64 = event.target?.result as string;
                const response = await fetch(
                  "http://localhost:3001/api/upload-bank-statement",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      image: base64,
                      email: formData.email,
                    }),
                  },
                );

                const data = await response.json();

                if (data.success) {
                  setFormData((p: any) => ({
                    ...p,
                    bankStatementPicture: {
                      url: data.url,
                      previewUrl,
                      uploading: false,
                    },
                  }));
                } else {
                  alert("Upload failed. Please try again.");
                  setFormData((p: any) => ({
                    ...p,
                    bankStatementPicture: null,
                  }));
                }
              };
              reader.readAsDataURL(file);
            } catch (error) {
              console.error("Upload error:", error);
              alert("Upload failed. Please try again.");
              setFormData((p: any) => ({
                ...p,
                bankStatementPicture: null,
              }));
            }
          }}
        />

        {formData.bankStatementPicture?.previewUrl && (
          <div className="image-preview">
            <img
              src={formData.bankStatementPicture.previewUrl}
              alt="Bank statement preview"
              className="preview-image"
            />
            {formData.bankStatementPicture.uploading && (
              <div className="upload-overlay">Uploading...</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
