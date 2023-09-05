import React from "react";
import "./singleAnouncement.css";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const SingleAnnouncement = () => {
  const param = useLocation();
  const id = param.pathname.split("/")[2];
  const [post, setPost] = useState([]);
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
          `https://behpack.com/backend/api/v1/site/post/fetch/${id}`,
          configuration
        );
        setPost(response.data.body);
      } catch {}
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="singleNews">
        <div className="singleNewsWrapper">
          <img
            className="singleNewsImg"
            src={`https://behpack.com/backend/storage/public/post/image/${post.image}`}
            alt="news"
          />
          <h1 className="singleNewsTitle">{post.title}</h1>

          <div className="singleNewsDesc">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          </div>
         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleAnnouncement;
