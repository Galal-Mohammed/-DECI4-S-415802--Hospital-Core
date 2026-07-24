import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          🏥 Healthcare System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/dashboard") ? "active fw-bold" : ""}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/patients") ? "active fw-bold" : ""}`}
                to="/patients"
              >
                Patients
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/medical-records") ? "active fw-bold" : ""}`}
                to="/medical-records"
              >
                Medical Records
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/appointments") ? "active fw-bold" : ""}`}
                to="/appointments"
              >
                Appointments
              </Link>
            </li>

            <li className="nav-item ms-3">
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;