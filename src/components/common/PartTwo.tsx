import { useForm } from "../../context/FormContext";
import "./Info.css";

export function PartTwo() {
  const { formData, setFormData } = useForm();

  return (
    <section className="form-section">
      <div className="name-container"></div>
    </section>
  );
}
