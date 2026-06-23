import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage"; 

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 font-sans">
      <Navbar />

      <div className="flex flex-1 flex-col">
        <Routes>
          {/* Public routes for guest users only */}
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Secure portal routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Future routes like /modules or /students go here */}
          </Route>

          {/* Fallback Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
