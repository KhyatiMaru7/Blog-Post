import { NavLink, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import "./Navbar.css";
import { useState, useContext } from "react";
import ConfiramationModal from "./ConfiramationModel";
import { ToastContainer, toast } from "react-toastify";
import EditProfile from "./EditProfileModel";
import ModeContext from "../context/ModeContext";

export function Navbar(props) {
  const navigate = useNavigate();
  const ctx = useContext(ModeContext);

  const loggedInData =
    JSON.parse(localStorage.getItem("logInData")) || {};

  const [showModal, setShowModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const userInitial = loggedInData?.role?.charAt(0)?.toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("logInData");
    toast.success("Logout successfully");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <>
     <nav className={`nav ${ctx?.mode === "dark" ? "nav-dark" : "nav-light"}`}>
  <h3>BlogPost</h3>

  <ul className="nav-links">
    <li><NavLink to="/">Home</NavLink></li>

    {loggedInData?.role === "Admin" && (
      <li><NavLink to="/new-post">New Post</NavLink></li>
    )}

    <li><NavLink to="/explore">Explorepost</NavLink></li>

    <li>
      <span onClick={() => setShowModal(true)}>Logout</span>
    </li>
  </ul>

  <div className="nav-right">
    <span className="mode-toggle" onClick={ctx.toggleMode}>
      {ctx.mode === "dark" ? "Light" : "Dark"} Mode <MdDarkMode />
    </span>

    <div className="circle" onClick={() => setShowEditProfile(true)}>
      <span>{userInitial}</span>
    </div>
  </div>
</nav>


      {showEditProfile && (
        <EditProfile
          onClose={() => setShowEditProfile(false)}
          userId={loggedInData?.id}
        />
      )}

      {showModal && (
        <ConfiramationModal
          title="Logout?"
          desc="Are you sure?"
          confirmBtnText="Logout"
          onConfirm={handleLogout}
          onClose={() => setShowModal(false)}
        />
      )}

      <ToastContainer />
    </>
  );
}
