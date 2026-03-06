import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password) return alert("Fill all fields");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.find(u => u.username === username)) return alert("Username already exists");

    users.push({ username, password, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>
        <div className="auth-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;