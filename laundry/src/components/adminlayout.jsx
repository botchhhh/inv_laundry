import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // update the path to your logo

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div>
          {/* Logo only */}
          <div className="logo">
            <img src={logo} alt="Laundry Inventory Logo" style={{ width: "160px" }} />
          </div>

          <ul>
            {/* Home visible to everyone */}
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>

            {loggedInUser.role === "admin" && (
              <li>
                <NavLink to="/admin-dashboard" className="nav-link">
                  Reports
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User Section pinned at bottom */}
        <div className="bottom-buttons">
          <p>{loggedInUser.username}</p>
          <small>{loggedInUser.role === "admin" ? "Admin" : "Client"}</small>

          <button
            className="profile-btn"
            onClick={() => navigate("/Profile")}
          >
            Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
}

export default AdminLayout;