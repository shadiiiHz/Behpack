import React from "react";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.admin);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    navigate("/dashboard");
  };
  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <h2 className="subtitle">Please sign in to see the dashboard</h2>

        <form className="form">
          <input
            type="text"
            placeholder="Email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" onClick={handleClick} disabled={isFetching} >Login</button>
          {error && <p className="error">Email or password is wrong</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
