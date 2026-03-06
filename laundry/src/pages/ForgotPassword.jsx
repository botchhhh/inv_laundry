import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);
    if (!user) return alert("User not found");

    const newPassword = prompt("Enter new password");
    if (!newPassword) return;
    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your username to reset your password</p>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button className="auth-btn" onClick={handleReset}>
          Reset Password
        </button>
        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;