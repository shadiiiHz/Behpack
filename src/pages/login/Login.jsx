import React from "react";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.admin);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
    navigate("/dashboard");
    // console.log("login",Date.now() / 1000)
    // setCreated_at(Date.now() / 1000)
  };
  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <h2 className="subtitle">Please sign in to see the dashboard</h2>

        <form className="form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="pwd-container">
            <input
              name="password"
              type={isRevealPwd ? "text" : "password"}
              placeholder="Password"
              required
              // className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isRevealPwd ? (
              <VisibilityOffIcon
                className="icon"
                style={{ color: "#53c28b" }}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            ) : (
              <VisibilityIcon
                className="icon"
                style={{ color: "#53c28b" }}
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            )}
          </div>

          <button
            className="button"
            onClick={handleClick}
            disabled={isFetching}
          >
            Login
          </button>
          {error && <p className="error">Email or password is wrong</p>}
          <Link className="forgetPassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
