import React, { useEffect, useState } from "react";
import "./messages.css";
import Topbar from "../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../components/dashboard/adminSidebar/AdminSidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import MessageIcon from "@mui/icons-material/Message";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
const ContactUsShow = () => {
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);

  const token = useSelector((state) => state.admin.currentUser);
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
          `http://localhost:8000/api/v1/admin/contact-us/search?page=${page}`,
          configuration
        );
        setpageCount(response.data.body.last_page);
        setData(response.data.body.data);
        
      } catch {}
    };
    getData();
  }, [page]);
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/contact-us/delete/${id}`,
        configuration
      );
      const newList = data.filter((item) => item.id != id);
      setData(newList);
      Swal.fire({
        title: "message deleted!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
    } catch (err) {}
  };
  return (
    <>
      <Topbar />
      <div className="contactUs">
        <AdminSidebar />
        <div className="contactUsInfo">
          <div className="contactUsInfoTitle">Contact us</div>
          <div className="contactUsInfCards">
            {data &&
              data?.map((msg) => {
                return (
                  <div className="card-container" key={msg.id}>
                    <div className="success">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <MessageIcon className="succes-svg" />
                        </div>
                        <div className="card-container-wrap">
                          <p className="card-container-heading">{`Message ${msg.id}`}</p>
                          <div className="card-container-prompt">
                            <div>
                              <h6>Author: </h6>
                              {`${msg.first_name + " " + msg.last_name}`}
                            </div>
                            <div>
                              <h6>Email: </h6>
                              {`${msg.email}`}
                            </div>
                            <div>
                              <h6>Company: </h6>
                              {`${msg.company}`}
                            </div>
                            <div>
                              <h6>Phone: </h6>
                              {`${msg.phone}`}
                            </div>
                            <div>
                              <h6>Address: </h6>
                              {`${msg.address}`}
                            </div>
                            <div>
                              <h6>Message: </h6>
                              {`${msg.message}`}
                            </div>
                          </div>
                          <button
                            className="deleteMessageBtn"
                            onClick={(e) => handleDelete(e, msg.id)}
                          >
                            delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
        </div>
      </div>
    </>
  );
};

export default ContactUsShow;
