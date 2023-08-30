import React, { useEffect, useState } from "react";
import "./about.css";
import image from "../../images/about.JPG";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
const About = () => {
  const [content, setContent] = useState("");
  const [loading , setLoading] = useState(false)

  ////////fetch///////
  useEffect(() => {
    const getAbout = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/site/about-us/fetch`
        );

        setContent(response.data.body.content);
       
      } catch {}
    };
    setLoading(true)
    getAbout();
    setLoading(false)
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="imgContainer">
          <img src={image} fill="true" alt="" className="img" />
          <div className="imgText">
            <h1 className="imgTitle">BEHPAK</h1>
            <h2 className="imgDesc">Know more about us</h2>
          </div>
        </div>
        <div className="textContainer">
          <div className="item">
            <div className="desc">
              <strong style={{ color: "rgb(76, 83, 81)", fontSize: "25px" }}>
                Who Are We?
              </strong>
              <br />
              <br />
              <div className="line-height" dangerouslySetInnerHTML={{ __html: content }} />
              {loading && <div className="spinner-border text-success mt-5"></div>}
            </div>
            <Button url="/contact" text="Contact" />
          </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default About;
