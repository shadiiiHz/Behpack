import React, { useState } from "react";
import "./resetPassword.css";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      const form = { token, password };
      try {
        const res = await axios
          .post(`https://behpack.com/backend/api/v1/auth/reset-password`, form)
          .then((response) => {
            if (response.data.ok) {
              setLoading(false);
              setErr(false);
              Swal.fire({
                title: "Password changed successfully!",
                icon: "success",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: "top-end",
              });
              navigate(`/login`);
            }
          });
        // console.log(res);
      } catch (err) {
        setLoading(false);
        Swal.fire({
          title: `${err.message}`,
          icon: "warning",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          toast: true,
          position: "top-end",
        });
      }
    } else {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="emailLoginContainer">
        <h2 className="emailLoginSubtitle">Please Enter your email</h2>

        <form className="form">
          <input
            type="text"
            name="password"
            placeholder="Password"
            required
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Confirm password"
            required
            className="input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            name="text"
            placeholder="Enter code"
            required
            className="input"
            onChange={(e) => setToken(e.target.value)}
          />
          <button className="button" onClick={handleClick}>
            Change password
            {loading && (
              <div className="spinner-border spinner-border-sm text-light ms-2"></div>
            )}
          </button>
          {err && <p className="error">Passwords Don't Match</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
