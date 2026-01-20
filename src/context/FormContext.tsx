import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type FormData = {
  // Sector One:
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
  // Sector Two:
  incomeSource: {
    type:
      | "traditional-employment"
      | "driver-shopper"
      | "freelancing"
      | "reselling"
      | "content-creator"
      | "e-commerce"
      | "no-hustle-gig"
      | "other"
      | "";
    other: string;
  };
  incomeLength: {
    type: "month-less" | "month-year" | "couple-years" | "five-years-plus" | "";
  };
  incomeAmount: number;
  incomeConsistency: {
    type: "very-inconsistent" | "Variable" | "very-consistent" | "";
  };
  bankStatementPicture: any;
  // Sector Three:
  requestAmount: number;
  purpose: string;
  increaseYourProfits: string; //(Example: ill buy $1000 worth of inventory and resell for 40% markup and profit +$400/month
  whenCapitalImpact: { type: "1M" | "1TO3M" | "3TO6M" | "year-plus" | "" }; //A date: 1 week, 1 month, 1 year? etc.
  projectedMonthlyProfit: string;
  // Sector Four:
  fundingStructure: { type: "markup" | "revenue-share" | "profit-share" | "" };
  paybackTimeFrame: string;
  paybackFrequency: { type: "weekly" | "bi-weekly" | "monthly" | "" }; // weekly, bi, monthly
  // Sector Five:
  anyDebt: {
    type: "YES" | "NO" | "";
  };
  creditScore: number;
  legalDisputes: {
    type: "YES" | "NO" | "";
  };
  experienceWithApp: {
    type: "YES" | "NO" | "";
  };
  //Sector Six:
  accurateIncomeInfo: any;
  consentToBGCheck: any;
  understandBankingStructure: any;
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
    // Sector One:
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
    // Sector Two:
    incomeSource: {
      type: "",
      other: "",
    },
    incomeLength: { type: "" },
    incomeAmount: 30000,
    incomeConsistency: {
      type: "",
    },
    bankStatementPicture: ``,
    // Sector Three:
    requestAmount: 1000,
    purpose: "",
    increaseYourProfits: "",
    whenCapitalImpact: { type: "" },
    projectedMonthlyProfit: "",
    // Sector Four:
    fundingStructure: { type: "" },
    paybackTimeFrame: "",
    paybackFrequency: { type: "" },
    // Sector Five:
    anyDebt: {
      type: "",
    },
    creditScore: 720,
    legalDisputes: {
      type: "",
    },
    experienceWithApp: {
      type: "",
    },
    // Sector Six:
    accurateIncomeInfo: {},
    consentToBGCheck: {},
    understandBankingStructure: {},
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
      JSON.stringify({ ...formData, __v: STORAGE_VERSION }),
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
