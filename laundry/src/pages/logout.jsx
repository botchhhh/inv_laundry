import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear logged in user
    localStorage.removeItem("loggedInUser");
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // nothing to render
}

export default Logout;