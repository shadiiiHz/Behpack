import React from "react";
import "./home.css";
import ImageCarousel from "../../components/carousel/ImageCarousel";
import ProductList from "../../components/products/ProductList";
import HomepageSidbar from "../../components/homeSidebar/HomepageSidbar";
import News from "../../components/news/News";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const [slider, setSlider] = useState("");
  const [productList, setProductList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  ////////fetch///////
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/site/home`
        );
        setSlider(response.data.body.sliders)
        setProductList(response.data.body.products)
        setNewsList(response.data.body.posts)
      } catch {}
    };
    getData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="homeSlider">
        <ImageCarousel slider={slider} />
      </div>

      <div className="home">
        <ProductList productList={productList} />
        <HomepageSidbar />
      </div>
      <hr className="line" />
      <div className="newstitle">
        <NewspaperIcon fontSize="large" sx={{ mr: 1 }} />
        Latest News
      </div>
      <News newsList={newsList} />
      <Footer />
    </>
  );
};

export default Home;
