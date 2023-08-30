import React, { useRef, useState } from "react";
import "./newNews.css";
import Topbar from "../../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../../components/dashboard/adminSidebar/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
const NewNews = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
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
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", desc);
    formData.append("image", image);

    try {
      const res = await axios
        .post(
          `http://localhost:8000/api/v1/admin/post/create`,
          formData,
          configuration
        )
        .then((res) => {
          Swal.fire({
            title: "post created!",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top-end",
          });
          navigate(`/newsTable`);
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
      <div className="newNews">
        <AdminSidebar />
        <div className="newNewsWrapper">
          <div className="newNewsWrapperTitle">New post</div>
          <form className="newNewsForm">
            <label htmlFor="fileInput">
              upload post image :
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
              err.image.map((error) => {
                return <div className="error">{error}</div>;
              })}

            <label>post title: </label>
            <input
              type="text"
              name="title"
              placeholder="post title..."
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
              err.title.map((error) => {
                return <div className="error">{error}</div>;
              })}
          </form>
          <div className="newNewsDesc">post description :</div>
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
            err.content.map((error) => {
              return <div className="error">{error}</div>;
            })}
          <button onClick={handleClick} className="createNewsBtn">
            create
          </button>
        </div>
      </div>
    </>
  );
};

export default NewNews;
