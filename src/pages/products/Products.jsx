import React from "react";
import "./products.css";
import ProductList from "../../components/products/ProductList";
import HomepageSidebar from "../../components/homeSidebar/HomepageSidbar";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);

  ////////fetch///////
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/site/product/search?page=${page}`
        );
        setpageCount(response.data.body.last_page);
        setProductList(response.data.body.data)
   
      } catch {}
    };
    getData();
  }, [page]);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  return (
    <>
      <Navbar />
      <div className="products">
        <ProductList productList={productList} />
        <HomepageSidebar />
      </div>
      <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
      <Footer />
    </>
  );
};

export default Products;
