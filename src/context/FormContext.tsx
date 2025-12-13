import { createContext, useContext, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
  requestAmount: number;
  purpose: string;
  email: string;
  [key: string]: string | number;
};

const FormContext = createContext<{
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
} | null>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: 25,
    requestAmount: 5000,
    purpose: "",
    email: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useForm must be used inside FormProvider");
  return ctx;
};
