import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { GetStarted } from "./pages/GetStarted/GetStarted";
import { UserPanel } from "./pages/User/UserPanel";
import { Auth } from "./pages/User/Auth";
import { TwoFactorPrompt } from "./pages/User/TwoFactorPrompt";
import { Documents } from "./pages/Forms/Documents";
import { BugSubmitted } from "./pages/Forms/BugSubmitted";
import { ContactSubmitted } from "./pages/Forms/ContactSubmitted";
import { RevenueTracker } from "./pages/RevenueTracker";
import { RevenueLogger } from "./pages/RevenueLogger";
import { Waitlist } from "./pages/Waitlist";
import "./styles/App.css";
import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <FormProvider>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="get-started" element={<GetStarted />} />
        <Route path="user-panel" element={<UserPanel />} />
        <Route path="auth" element={<Auth />} />
        <Route path="two-factor" element={<TwoFactorPrompt />} />
        <Route path="documents" element={<Documents />} />
        <Route path="bug-submitted" element={<BugSubmitted />} />
        <Route path="contact-submitted" element={<ContactSubmitted />} />
        <Route path="revenue-tracker" element={<RevenueTracker />} />
        <Route path="revenue-logger" element={<RevenueLogger />} />
        <Route path="waitlist" element={<Waitlist />} />
      </Routes>
    </FormProvider>
  );
}

export default App;
