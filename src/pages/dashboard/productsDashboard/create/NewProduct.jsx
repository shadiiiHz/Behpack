import React, { useEffect, useRef, useState } from "react";
import "./newProduct.css";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import JoditEditor from "jodit-react";
import { Editor } from "@tinymce/tinymce-react";

const NewProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoFiles, setVideoFiles] = useState(null);
  const [capacity, setCapacity] = useState("");
  const [err, setErr] = useState([]);

  // const editor = useRef(null);
  const editorRef = useRef(null);
  const token = useSelector((state) => state.admin.currentUser);

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    if (videoFiles) {
      let arr = Array.from(videoFiles);

      arr.map((video) => {
       
        if (video.size < 10000000) {
          const formData = new FormData();
          formData.append("video", video);
          axios
            .post(
              `http://localhost:8000/api/v1/admin/product/upload/video`,
              formData,
              configuration
            )
            .then((response) => {
              setVideos((prevArray) => [...prevArray, response.data.body]);
            })
            .catch((error) => {
              Swal.fire({
                title: `${error.message}`,
                icon: "warning",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000,
                toast: true,
                position: "top-end",
              });
            });
        } else {
          Swal.fire({
            title: "File size is greater than maximum limit!",
            icon: "warning",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top-end",
          });
        }
      });
    }
  }, [videoFiles]);
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", desc);
    formData.append("capacity", capacity);
    formData.append("image", image);

    if (videos.length != 0) {
      videos.forEach((vid) => formData.append("videos[]", vid.name));
    } else if (videos.length === 0) {
      formData.append("videos[]", JSON.stringify([]));
    }

    try {
      const res = await axios
        .post(
          `http://localhost:8000/api/v1/admin/product/create`,
          formData,
          configuration
        )
        .then((res) => {
          Swal.fire({
            title: "product created!",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top-end",
          });
          navigate(`/productsTable`);
        });
    } catch (err) {
      setErr(err.response.data.errors);

      Swal.fire({
        title: `${err.response.data.message}`,
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
      <div className="newProduct">
        <AdminSidebar />
        <div className="newProductWrapper">
          <div className="newProductWrapperTitle">New product</div>
          <form className="newProductForm">
            <label htmlFor="fileInput">
              upload product image :
              <FileUploadIcon className="slider-input-icon" fontSize="large" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
                if (err.image) {
                  err.image = "";
                }
              }}
            />
            {err.image &&
              err.image.map((error, index) => {
                return (
                  <div className="error" key={index}>
                    {error}
                  </div>
                );
              })}

            <label htmlFor="videoInput">
              upload product videos :
              <FileUploadIcon className="slider-input-icon" fontSize="large" />
            </label>
            <input
              id="videoInput"
              type="file"
              style={{ display: "none" }}
              multiple
              onChange={(e) => {
                setVideoFiles(e.target.files);
                // console.log(e.target.files)
              }}
            />

            <label>product title: </label>
            <input
              type="text"
              name="title"
              placeholder="product title..."
              className="input"
              onChange={(e) => {
                setTitle(e.target.value);
                if (err.title) {
                  err.title = "";
                }
              }}
              required
            />
            {err.title &&
              err.title.map((error, index) => {
                return (
                  <div className="error" key={index}>
                    {error}
                  </div>
                );
              })}
            <label>product capacity: </label>
            <input
              type="text"
              name="capacity"
              placeholder="product capacity..."
              className="input"
              onChange={(e) => {
                setCapacity(e.target.value);
                if (err.capacity) {
                  err.capacity = "";
                }
              }}
              required
            />
            {err.capacity &&
              err.capacity.map((error, index) => {
                return (
                  <div className="error" key={index}>
                    {error}
                  </div>
                );
              })}
          </form>
          <div className="newProductDesc">product description :</div>
          {/* <JoditEditor
            ref={editor}
            value={desc}
            tabIndex={1}
            onChange={(newContent) => {
              setDesc(newContent);
              if (err.content) {
                err.content = "";
              }
            }}
          /> */}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            // initialValue={defaultContent}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(newContent) => {
              setDesc(newContent);
              if (err.content) {
                err.content = "";
              }
            }}
          />
          {err.content &&
            err.content.map((error, index) => {
              return (
                <div className="error" key={index}>
                  {error}
                </div>
              );
            })}
          <button onClick={handleClick} className="createProductBtn">
            create
          </button>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
