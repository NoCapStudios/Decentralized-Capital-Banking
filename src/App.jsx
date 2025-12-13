import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { GetStarted } from "./pages/GetStarted/GetStarted";
import { UserPanel } from "./pages/User/UserPanel";
import { Auth } from "./pages/User/Auth";
import { Documents } from "./pages/Forms/Documents";
import { RevenueTracker } from "./pages/RevenueTracker";
import { RevenueLogger } from "./pages/RevenueLogger";
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
        <Route path="documents" element={<Documents />} />
        <Route path="revenue-tracker" element={<RevenueTracker />} />
        <Route path="revenue-logger" element={<RevenueLogger />} />
      </Routes>
    </FormProvider>
  );
}

export default App;
