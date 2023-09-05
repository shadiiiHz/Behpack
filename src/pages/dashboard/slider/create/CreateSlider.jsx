import React, { useState } from "react";
import "./createSlider.css";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreateSlider = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [error, setErorr] = useState([]);
  const [uploadingText, setUploadingText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.admin.currentUser);

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setUploadingText("uploading...");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("arrange", 1);
    try {
      const res = await axios
        .post(
          `https://behpack.com/backend/api/v1/admin/slider/create`,
          formData,
          configuration
        )
        .then((res) => {
          if (res.data.ok) {
            setUploadingText("Image uploaded!");
            setLoading(false);
            Swal.fire({
              title: "Image added!",
              icon: "success",
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 3000,
              toast: true,
              position: "top-end",
            });
            navigate(`/slider`);
          }
        });
    } catch (err) {
      setUploadingText("");
      setLoading(false);
      setErorr(err.response.data.errors);
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
      <div className="sliderContainer">
        <AdminSidebar />
        <div className="sliderContainerInfo">
          <div className="sliderContainerInfoTitle">Create slider</div>
          <form className="slider-form">
            <div className="slider-input">
              <label htmlFor="fileInput">
                upload image slide :
                <FileUploadIcon
                  className="slider-input-icon"
                  fontSize="large"
                />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  if (error.image) {
                    error.image = "";
                  }
                }}
              />
            </div>
            {uploadingText && (
              <div className="uploadingText">{uploadingText}</div>
            )}
            {error.image &&
              error.image.map((err, index) => {
                return (
                  <div className="error" key={index}>
                    {err}
                  </div>
                );
              })}
          </form>
          <button onClick={handleClick} className="createSlideBtn">
            create
            {loading && (
              <div className="spinner-border spinner-border-sm text-light ms-2"></div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateSlider;
