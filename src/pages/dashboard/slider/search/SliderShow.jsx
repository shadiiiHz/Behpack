import React, { useEffect, useState } from "react";
import "./sliderShow.css";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "../../../../components/button/Button";
import Swal from "sweetalert2";
function Search() {
  const [imageList, setImageList] = useState();
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
          `http://localhost:8000/api/v1/admin/slider/search`,
          configuration
        );
        setImageList(response.data.body.data);
      } catch {}
    };
    getData();
  }, []);
  const handleVideoDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/admin/slider/delete/${id}`,
        configuration
      );
      const newImages = imageList.filter((item) => item.id != id);
      setImageList(newImages);
      Swal.fire({
        title: "Image deleted!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
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
      <Topbar />
      <div className="search-slider">
        <AdminSidebar />
        <div className="search-slider-info">
          <div className="search-slider-info-title">Slider</div>
          <Button text="create" url="/newSlider" />
          <div className="search-slider-info-card">
            {imageList &&
              imageList?.map((img) => {
                return (
                  <div className="search-slider-card" key={img.id}>
                    <img
                      src={`http://localhost:8000/storage/slider/image/${img.path}`}
                      alt="slider-image"
                      className="search-slider-img"
                    />
                    <button
                      className="deleteSlide"
                      onClick={(e) => handleVideoDelete(e, img.id)}
                    >
                      delete
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
