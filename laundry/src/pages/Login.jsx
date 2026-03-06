import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SECRET_ADMIN_CODE = "ADMIN123";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Admin login
    if (username === "admin" && password === SECRET_ADMIN_CODE) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ username: "admin", role: "admin" })
      );
      return navigate("/");
    }

    // Regular user login
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ username: user.username, role: "user" })
    );

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="auth-links">
          <Link to="/register">Register</Link> |{" "}
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;