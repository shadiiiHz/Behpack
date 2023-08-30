import React, { useEffect, useRef, useState } from "react";
import "./updateNews.css";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import JoditEditor from "jodit-react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import axios from "axios";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
const UpdateNews = () => {
  const param = useLocation();
  const id = param.pathname.split("/")[2];

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [defaultDesc, setDefaultDesc] = useState("");
  const [image, setImage] = useState("");
  const [defaultImage, setDefaultImage] = useState("");

  // const editor = useRef(null);
  const editorRef = useRef(null);
  const token = useSelector((state) => state.admin.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  ////////////////fetch post///////////////////
  useEffect(() => {
    const getpost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/admin/post/fetch/${id}`,
          configuration
        );

        setTitle(response.data.body.title);
        setDefaultImage(response.data.body.image);
        setDefaultDesc(response.data.body.content);
      } catch {}
    };
    getpost();
  }, [id]);
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", desc);
    formData.append("image", image);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/admin/post/update/${id}`,
        formData,
        configuration
      );
      Swal.fire({
        title: "post updated!",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: "top-end",
      });
      navigate(`/newsTable`);
    } catch (err) {}
  };
  return (
    <>
      <Topbar />
      <div className="updateNews">
        <AdminSidebar />
        <div className="updateNewsWrapper">
          <div className="updateNewsWrapperTitle">Edit post</div>
          <img
            className="updateNewsImage"
            src={`http://localhost:8000/storage/post/image/${defaultImage}`}
            alt="post image"
          />
          <form className="updateNewsForm">
            <label htmlFor="fileInput">
              upload new post image :
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

            <label>post title: </label>
            <input
              type="text"
              name="title"
              placeholder="post title..."
              className="input"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </form>
          <div className="updateNewsDesc">product description :</div>
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
          <button onClick={handleClick} className="createNewsBtn">
            update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateNews;
