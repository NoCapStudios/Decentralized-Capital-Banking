import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { GetStarted } from "./pages/GetStarted/GetStarted";
import { RevenueTracker } from "./pages/RevenueTracker";
import { RevenueLogger } from "./pages/RevenueLogger";
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="get-started" element={<GetStarted />} />
      <Route path="revenue-tracker" element={<RevenueTracker />} />
      <Route path="revenue-logger" element={<RevenueLogger />} />
    </Routes>
  );
}

export default App;
