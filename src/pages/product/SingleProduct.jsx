import React from "react";
import "./singleProduct.css";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const SingleProduct = () => {
  const param = useLocation();
  const id = param.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const [hasVideo, setHasVideo] = useState(0);
  ////////fetch///////
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/site/product/fetch/${id}`
        );
       
        setProduct(response.data.body);
        console.log(response.data.body.content)
        setHasVideo(response.data.body.files.length);
      } catch {}
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="singleProduct">
        <div className="singleProductWrapper">
          <img
            className="singleProductImg"
            src={`http://localhost:8000/storage/product/image/${product.image}`}
            alt="Product"
          />

          <div className="singleProductInfo">
            <h1 className="singleProductTitle">{product.title}</h1>
            <span className="singleProductCap">
              Capacity: {product.capacity}
            </span>
            <div className="singleProductDesc">
              <div
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
            {hasVideo > 0 && (
              <Button text="Lets watch videos" url={`/products/${id}/videos`} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
