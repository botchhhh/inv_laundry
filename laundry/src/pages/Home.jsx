import React from "react";
import AdminLayout from "../components/adminlayout";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- put your logo here

function Home() {
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));

  // Admin view
  if (loggedIn?.role === "admin") {
    return (
      <AdminLayout>
        <div className="content">
          <h2 style={{ marginBottom: "20px", color: "#2b0f3a" }}>Welcome Admin</h2>
          <p style={{ fontSize: "15px", color: "#4b5563" }}>
            Use the sidebar to manage inventory, orders, and users efficiently.
          </p>
        </div>
      </AdminLayout>
    );
  }

  // User or guest view
  return (
    <div
      className="home-page"
      style={{
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "30px" }}>
        <img
          src={logo}
          alt="Laundry Management Logo"
          style={{ width: "150px", height: "auto", margin: "0 auto" }}
        />
      </div>

      {/* Welcome message */}
      <h2 style={{ marginBottom: "25px", color: "#2b0f3a" }}>
        Welcome to Laundry Management
      </h2>

      {!loggedIn && (
        <div style={{ marginBottom: "30px" }}>
          <Link to="/login">
            <button className="auth-btn" style={{ width: "180px" }}>
              Login
            </button>
          </Link>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#7c3aed" }}>
              Register here
            </Link>
          </p>
        </div>
      )}

      {loggedIn?.role === "user" && (
        <div style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "16px", color: "#4b5563", marginBottom: "10px" }}>
            Hello, <strong>{loggedIn.username}</strong>!
          </p>
          <Link to="/dashboard">
            <button className="auth-btn" style={{ width: "220px" }}>
              Proceed to Dashboard
            </button>
          </Link>
        </div>
      )}

      {/* Summary Grid */}
      <div className="summary-grid" style={{ marginTop: "40px" }}>
        <div className="summary-box">
          <h3>Track Your Laundry</h3>
          <p>Check current orders, status updates, and delivery times in real-time.</p>
        </div>

        <div className="summary-box">
          <h3>Laundry Tips</h3>
          <p>Separate whites and colors, treat stains quickly, and check item care labels.</p>
        </div>

        <div className="summary-box">
          <h3>Helpful Reminders</h3>
          <p>Keep pickup and delivery details updated to ensure smooth service.</p>
        </div>
      </div>

      {/* Announcements */}
      <div className="card" style={{ marginTop: "30px" }}>
        <h3>Announcements</h3>
        <p>No announcements yet. All systems operational.</p>
      </div>

      {/* Contact Us */}
      <div className="card" style={{ marginTop: "30px" }}>
        <h3>Contact Us</h3>
        <p>If you have any questions or need support, reach out to us!</p>
        <p>
          Email:{" "}
          <a href="mailto:support@laundryapp.com" style={{ color: "#7c3aed" }}>
            support@laundryapp.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+1234567890" style={{ color: "#7c3aed" }}>
            +1 234 567 890
          </a>
        </p>
        <p>Address: 123 Laundry St, Clean City</p>
      </div>
    </div>
  );
}

export default Home;