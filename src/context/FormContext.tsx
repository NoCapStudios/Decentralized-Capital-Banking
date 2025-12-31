import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type FormData = {
  names: {
    first: string;
    last: string;
    preferred: string;
  };
  dob: string;
  email: string;
  phone: string;
  governmentId: {
    type: "ssn" | "passport" | "state_id" | "";
    number: string;
  };
  location: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  };

  requestAmount: number;
  purpose: string;
  [key: string]: string | number | object | any;
};

type FormContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);
const STORAGE_KEY = "applicationData";
const STORAGE_VERSION = 2;

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const defaultFormData: FormData = {
    names: {
      first: "",
      last: "",
      preferred: "",
    },

    dob: "",

    email: "",
    phone: "",

    governmentId: {
      type: "",
      number: "",
    },

    location: {
      country: "US",
      state: "",
      city: "",
      zipcode: "",
    },

    requestAmount: 1000,
    purpose: "",
  };

  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultFormData;

    try {
      const parsed = JSON.parse(saved);

      if (parsed.__v !== STORAGE_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        return defaultFormData;
      }

      return {
        ...defaultFormData,
        ...parsed,
      };
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return defaultFormData;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...formData, __v: STORAGE_VERSION })
    );
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used inside FormProvider");
  }
  return context;
};
