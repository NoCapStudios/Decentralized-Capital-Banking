import { useForm } from "../../context/FormContext";
import "./Info.css";
import { COUNTRIES, US_STATES } from "../../context/constants";

export function PartOne() {
  const { formData, setFormData } = useForm();

  return (
    <section className="info-form-section-part-one">
      <div className="info-name-container">
        <input
          placeholder="First name"
          value={formData.names.first}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              names: { ...p.names, first: e.target.value },
            }))
          }
          className="info-field-input"
        />

        <input
          placeholder="Last name"
          value={formData.names.last}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              names: { ...p.names, last: e.target.value },
            }))
          }
          className="info-field-input"
        />

        <input
          className="info-field-input"
          placeholder="Preferred name (optional)"
          value={formData.names.preferred}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              names: { ...p.names, preferred: e.target.value },
            }))
          }
        />
      </div>

      {/* Date of birth */}
      <input
        type="date"
        value={formData.dob}
        onChange={(e) =>
          setFormData((p: any) => ({ ...p, dob: e.target.value }))
        }
        className="info-field-input"
      />

      {/* Contact information */}
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData((p: any) => ({ ...p, email: e.target.value }))
        }
        className="info-field-input"
      />

      <input
        type="tel"
        placeholder="Phone number"
        value={formData.phone}
        onChange={(e) =>
          setFormData((p: any) => ({ ...p, phone: e.target.value }))
        }
        className="info-field-input"
      />

      {/* Government ID - compact row */}
      <div className="info-gov-id-row">
        <select
          value={formData.governmentId.type}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              governmentId: {
                ...p.governmentId,
                type: e.target.value as any,
              },
            }))
          }
          className="info-field-select"
        >
          <option value="">ID type</option>
          <option value="ssn">SSN</option>
          <option value="state_id">State ID</option>
        </select>

        <input
          placeholder="ID Number"
          value={formData.governmentId.number}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              governmentId: {
                ...p.governmentId,
                number: e.target.value,
              },
            }))
          }
          className="info-field-input"
        />
      </div>

      {/* Location - Country and State in a row */}
      <div className="info-location-row">
        <select
          value={formData.location.country}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              location: { ...p.location, country: e.target.value },
            }))
          }
          className="info-field-select"
        >
          {COUNTRIES.map((c: any) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={formData.location.state}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              location: { ...p.location, state: e.target.value },
            }))
          }
          className="info-field-select"
        >
          <option value="">State</option>
          {US_STATES.map((s: any) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* City and Zip in a row */}
      <div className="info-location-row">
        <input
          placeholder="City"
          value={formData.location.city}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              location: { ...p.location, city: e.target.value },
            }))
          }
          className="info-field-input"
        />

        <input
          placeholder="Zip Code"
          value={formData.location.zipcode}
          onChange={(e) =>
            setFormData((p: any) => ({
              ...p,
              location: { ...p.location, zipcode: e.target.value },
            }))
          }
          className="info-field-input"
        />
      </div>
    </section>
  );
}
