import React from "react";
import "./contact.css";
import contactImg from "../../images/contact.png";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Contact = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const configuration = {
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("company", company);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("message", message);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/site/contact-us/create`,
        formData,
        configuration
      );
      Swal.fire({
        title: "Your message sent!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
      navigate(`/`);
      // console.log(res);
    } catch (err) {
      console.log(err.response.data.errors);
      setError(err.response.data.errors);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">Let's Keep in Touch</h1>
        <div className="content">
          <img src={contactImg} alt="contact" className="image" />

          <form className="form">
            <div className="information">
              <input
                type="text"
                placeholder="First name"
                className="input"
                required
                onChange={(e) => {
                  setFirst_name(e.target.value);
                  if (error.first_name) {
                    error.first_name = "";
                  }
                }}
              />

              <input
                type="text"
                placeholder="Last name"
                className="input"
                required
                onChange={(e) => {
                  setLast_name(e.target.value);
                  if (error.last_name) {
                    error.last_name = "";
                  }
                }}
              />
            </div>
            {error.first_name &&
              error.first_name.map((error , index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            {error.last_name &&
              error.last_name.map((error,index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                if (error.email) {
                  error.email = "";
                }
              }}
            />
            {error.email &&
              error.email.map((error,index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <input
              type="text"
              placeholder="Company"
              className="input"
              required
              onChange={(e) => {
                setCompany(e.target.value);
                if (error.company) {
                  error.company = "";
                }
              }}
            />
            {error.company &&
              error.company.map((error,index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <input
              type="text"
              placeholder="Adress"
              className="input"
              required
              onChange={(e) => {
                setAddress(e.target.value);
                if (error.address) {
                  error.address = "";
                }
              }}
            />
            {error.address &&
              error.address.map((error , index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <input
              type="tel"
              placeholder="Phone"
              className="input"
              required
              onChange={(e) => {
                setPhone(e.target.value);
                if (error.phone) {
                  error.phone = "";
                }
              }}
            />
            {error.phone &&
              error.phone.map((error,index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <textarea
              className="textArea"
              placeholder="Message"
              cols="30"
              rows="10"
              required
              onChange={(e) => {
                setMessage(e.target.value);
                if (error.message) {
                  error.message = "";
                }
              }}
            ></textarea>
            {error.message &&
              error.message.map((error,index) => {
                return <div className="error" key={index}>{error}</div>;
              })}
            <button className="sendBtn" onClick={handleClick}>
              send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
