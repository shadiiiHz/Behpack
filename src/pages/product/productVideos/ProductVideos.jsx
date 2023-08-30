import React from "react";
import "./productVideos.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const ProductVideos = () => {
  const param = useLocation();
  const id = param.pathname.split("/")[2];
  const [productVideos, setProductVideos] = useState([]);
  const token = useSelector((state) => state.admin.currentUser); //this must be remove
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  ////////fetch///////
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/site/product/fetch/${id}`,
          configuration
        );
       
        setProductVideos(response.data.body.files);
        // console.log(response.data.body.files.length)
      } catch {}
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="videosWrapper">
        <div className="videos">
          {productVideos &&
            productVideos.map((video) => {
              return(
                <div className="video" key={video.id}>
                <video width="320" height="240" controls>
                  <source src={`http://localhost:8000/storage/product/video/${video.path}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              )
            })}
        </div>
        <Link to={`/products/${id}`}>
          <button className="backBtn">
            <KeyboardBackspaceIcon />
            Back
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ProductVideos;
