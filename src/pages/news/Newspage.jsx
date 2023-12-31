import React from "react";
import "./newspage.css";
import News from "../../components/news/News";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Newspage() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const [loading, setLoading] = useState(false);
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
          `https://behpack.com/backend/api/v1/site/post/search?page=${page}`,
          configuration
        );
        setpageCount(response.data.body.last_page);
        setNewsList(response.data.body.data);
      } catch (err) {}
    };
    setLoading(true);
    getData();
    setLoading(false);
  }, [page]);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  return (
    <>
      <Navbar />
      <div className="newsPage">
        <News newsList={newsList} />
        {/* <HomepageSidebar /> */}
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
      {loading && <div className="spinner-border text-light m-2"></div>}
      <Footer />
    </>
  );
}

export default Newspage;
