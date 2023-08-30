import React, { useEffect, useRef, useState } from "react";
import "./updateProduct.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
// import JoditEditor from "jodit-react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

const UpdateProduct = () => {
  const param = useLocation();
  const id = param.pathname.split("/")[2];

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [defaultDesc, setDefaultDesc] = useState("");
  const [image, setImage] = useState("");
  const [defaultImage, setDefaultImage] = useState("");
  const [videos, setVideos] = useState([]);
  const [capacity, setCapacity] = useState("");
  const [videoFiles, setVideoFiles] = useState(null);
  // const editor = useRef(null);
  const editorRef = useRef(null);
  const token = useSelector((state) => state.admin.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  //   delete video
  const handleVideoDelete = async (e, videoId) => {
    e.preventDefault();
    try {
      const res = await axios
        .delete(
          `http://localhost:8000/api/v1/admin/product/remove/video/${videoId}`,
          configuration
        )
        .then((res) => {
          Swal.fire({
            title: "video deleted!",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top-end",
          });
        });
      const newVideos = videos.filter((item) => item.id != videoId);
      setVideos(newVideos);
    } catch (err) {
      // console.log(err.response.data.errors);
    }
  };
  ////////////////fetch product///////////////////
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/admin/product/fetch/${id}`,
          configuration
        );

        setTitle(response.data.body.title);
        setDefaultImage(response.data.body.image);
        setCapacity(response.data.body.capacity);
        setDefaultDesc(response.data.body.content);
        setVideos(response.data.body.files);
      } catch {}
    };
    getProduct();
  }, [id]);

  //   upload videos
  useEffect(() => {
    if (videoFiles) {
      let arr = Array.from(videoFiles);
      arr.map((video) => {
        if (video.size < 10000000) {
          const formData = new FormData();
          formData.append("video", video);
          formData.append("product_id", id);
          axios
            .post(
              `http://localhost:8000/api/v1/admin/product/upload/video`,
              formData,
              configuration
            )
            .then((response) => {})
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

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/admin/product/update/${id}`,
        formData,
        configuration
      );
      Swal.fire({
        title: "product updated!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
      navigate(`/productsTable`);
    } catch (err) {}
  };
  return (
    <>
      <Topbar />
      <div className="updateProduct">
        <AdminSidebar />
        <div className="updateProductWrapper">
          <div className="updateProductWrapperTitle">Edit product</div>
          <img
            className="updateProductImage"
            src={`http://localhost:8000/storage/product/image/${defaultImage}`}
            alt="product image"
          />
          <form className="updateProductForm">
            <label htmlFor="fileInput">
              upload new product image :
              <FileUploadIcon className="slider-input-icon" fontSize="large" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <label htmlFor="videoInput">
              upload new product videos :
              <FileUploadIcon className="slider-input-icon" fontSize="large" />
            </label>
            <input
              id="videoInput"
              type="file"
              style={{ display: "none" }}
              multiple
              onChange={(e) => {
                setVideoFiles(e.target.files);
              }}
            />
            <label>product title: </label>
            <input
              type="text"
              name="title"
              placeholder="product title..."
              className="input"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>product capacity: </label>
            <input
              type="text"
              name="capacity"
              placeholder="product capacity..."
              className="input"
              defaultValue={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </form>
          <div className="updateProductDesc">product description :</div>
          {/* <JoditEditor
            ref={editor}
            value={defaultDesc}
            // defaultValue={desc}
            tabIndex={1}
            onChange={(newContent) => setDesc(newContent)}
          /> */}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={defaultDesc}
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
            onEditorChange={(newContent) => setDesc(newContent)}
          />

          <div className="updateProductWrapperTitle">Videos</div>
          <div className="updateProductVideos">
            {videos.map((vid) => {
              // <pre>{JSON.stringify(videos)}</pre>
              return (
                <div className="updateProductVideo" key={vid.id}>
                  <video width="250" height="240" controls>
                    <source
                      src={`http://localhost:8000/storage/product/video/${vid.path}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    className="delete"
                    onClick={(e) => handleVideoDelete(e, vid.id)}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={handleClick} className="updateProductBtn">
            update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
