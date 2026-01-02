import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Shell from "../components/Shell";
import HomeDashboard from "../pages/HomeDashboard";
import Officers from "../pages/Officers";
import OfficerProfile from "../pages/OfficerProfile";
import Incidents from "../pages/Incidents";
import Operations from "../pages/Operations";
import Reports from "../pages/Reports";
import Login from "../pages/Login";
import Forbidden from "../pages/Forbidden";
import { useStore } from "../data/store";
import { RequireAuth } from "./guards";

export default function App() {
  const session = useStore((s) => s.session);
  const tick = useStore((s) => s.tick);

  useEffect(() => {
    const t = setInterval(() => tick(), 5000);
    return () => clearInterval(t);
  }, [tick]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to={session ? "/home" : "/login"} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forbidden" element={<Forbidden />} />

        <Route path="/home" element={<RequireAuth><Shell><HomeDashboard /></Shell></RequireAuth>} />
        <Route path="/officers" element={<RequireAuth><Shell><Officers /></Shell></RequireAuth>} />
        <Route path="/officers/:npodiasId" element={<RequireAuth><Shell><OfficerProfile /></Shell></RequireAuth>} />
        <Route path="/incidents" element={<RequireAuth><Shell><Incidents /></Shell></RequireAuth>} />
        <Route path="/operations" element={<RequireAuth><Shell><Operations /></Shell></RequireAuth>} />
        <Route path="/reports" element={<RequireAuth><Shell><Reports /></Shell></RequireAuth>} />

        <Route path="*" element={<Navigate to={session ? "/home" : "/login"} replace />} />
      </Routes>
    </>
  );
}
