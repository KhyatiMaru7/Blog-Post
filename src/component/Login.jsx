import React, { useState } from "react";
import "./Login.css";
import loginImage from "../assets/hh.gif";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfiramationModal from "../component/ConfiramationModel";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [generateOtp, setGenerateOtp] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setGenerateOtp(random.toString());
    setOtp(random.toString());
    alert("OTP: " + random);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobileNo || !role || !otp) {
      toast.error("All fields required");
      return;
    }
    if (otp !== generateOtp) {
      toast.error("Invalid OTP");
      return;
    }
    setShowLoginModal(true);
  };

  const handleFinalLogin = async () => {
    try {
      const response = await fetch(
        "https://696b4ae8624d7ddccaa0b9c0.mockapi.io/User",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobileNo, role, otp }),
        }
      );

      const data = await response.json();
      console.log("LOGIN API DATA:", data);

      // ✅ VERY IMPORTANT FIX
      localStorage.setItem("logInData", JSON.stringify(data));

      toast.success("Login Successfully");
      setShowLoginModal(false);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={loginImage} alt="login" />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            placeholder="Mobile No"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            maxLength={10}
          />

          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button type="button" className="btn primary" onClick={handleGenerateOtp}>
            Generate OTP
          </button>

          <input
            className="input-field"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit" className="btn secondary">
            Login
          </button>
        </form>
      </div>

      {showLoginModal && (
        <ConfiramationModal
          title="Confirm Login?"
          desc="Are you sure?"
          confirmBtnText="Login"
          onConfirm={handleFinalLogin}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
