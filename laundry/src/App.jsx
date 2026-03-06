import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import LaundryAdminDashboard from "./pages/LaundryAdminDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

function ProtectedRoute({ children, role }) {
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedIn) return <Navigate to="/login" replace />; // not logged in
  if (role && loggedIn.role !== role) return <Navigate to="/" replace />; // wrong role
  return children;
}

function App() {
  return (
  
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <LaundryAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    
  );
}

export default App;