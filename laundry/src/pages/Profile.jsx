import { useState, useEffect } from "react";
import AdminLayout from "../components/adminlayout";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [secretCode, setSecretCode] = useState(""); // for admin secret code
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn) navigate("/login");
    else {
      setUser(loggedIn);

      // If admin, load secret code from localStorage
      if (loggedIn.role === "admin") {
        const storedSecret = localStorage.getItem("secret_admin_code") || "ADMIN123";
        setSecretCode(storedSecret);
      }
    }
  }, []);

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    // Update users list for normal users
    if (user.role === "user") {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map(u =>
        u.username === user.username ? { ...u, password: newPassword || u.password } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Profile updated!");
    }

    // Update admin secret code
    if (user.role === "admin") {
      if (newPassword) setSecretCode(newPassword);
      localStorage.setItem("secret_admin_code", newPassword || secretCode);
      alert("Admin secret code updated!");
    }

    // Update loggedInUser in localStorage
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...user, password: newPassword || user.password })
    );

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <AdminLayout>
      <div className="user-dashboard card">
        <h2 style={{ marginBottom: "20px" }}>Profile</h2>

        <div style={{ display: "grid", gap: "15px" }}>
          <label>
            Username:
            <input
              type="text"
              className="input-field"
              value={user.username}
              onChange={e => setUser({ ...user, username: e.target.value })}
            />
          </label>

          {user.role === "admin" && (
            <label>
              Admin Secret Code:
              <input
                type="text"
                className="input-field"
                value={secretCode}
                onChange={e => setSecretCode(e.target.value)}
              />
            </label>
          )}

          <label>
            New Password:
            <input
              type="password"
              className="input-field"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </label>

          <label>
            Confirm Password:
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </label>

          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Profile;