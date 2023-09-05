import React, { useState } from 'react'
import "./emailLogin.css"
import Navbar from '../../../components/navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmailLogin = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault();
        
        const form = { email };
        try {
          const res = await axios.post(
            `https://behpack.com/backend/api/v1/auth/forget-password`,
            form
          ).then((response) =>{
            if(response.data.ok){
             
              Swal.fire({
                title: "Code will be sent to your email!",
                icon: "success",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: "top-end",
              });
              navigate(`/password/reset`)
            }
          })
         ;
          // console.log(res);
        } catch (err) {
       
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
      };
      
  return (
    <>
      <Navbar />
      <div className="emailLoginContainer">
        <h2 className="emailLoginSubtitle">Please Enter your email</h2>

        <form className="form">
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
          />
         
          <button
            className="button"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default EmailLogin