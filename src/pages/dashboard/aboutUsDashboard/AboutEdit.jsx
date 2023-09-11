import React, { useEffect, useRef, useState } from "react";
import "./aboutEdit.css";
import Topbar from "../../../components/dashboard/topbar/Topbar";
import AdminSidebar from "../../../components/dashboard/adminSidebar/AdminSidebar";
// import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

const AboutEdit = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [defaultContent, setDefaultContent] = useState("");
  // const editor = useRef(null);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.admin.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  ////////fetch///////
  useEffect(() => {
    const getAbout = async () => {
      try {
        const response = await axios.get(
          `https://behpack.com/backend/api/v1/admin/about-us/fetch`,
          configuration
        );

        setDefaultContent(response.data.body.content);
        setContent(response.data.body.content)
      } catch {}
    };
    getAbout();
  }, []);
  /////////////update///////////
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    const form = { content };
    try {
      const res = await axios.post(
        `https://behpack.com/backend/api/v1/admin/about-us/update`,
        form,
        configuration
      ).then((response) =>{
        if(response.data.ok){
          setLoading(false)
          Swal.fire({
            title: "About us updated!",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top-end",
          });
          navigate(`/dashboard`)
        }
      })
     ;
      // console.log(res);
    } catch (err) {
      setLoading(false);
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
      <div className="aboutEdit">
        <AdminSidebar />
        <div className="aboutEditInfo">
          <div className="aboutEditInfoTitle">About us</div>
          {/* <JoditEditor
            ref={editor}
            value={defaultContent}
            tabIndex={1}
            onChange={(newContent) => setContent(newContent)}
          /> */}
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={defaultContent}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "fullscreen",
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
              setContent(newContent);
            }}
          />
         
          <button onClick={handleClick} className="updateAboutBtn">
            update
            {loading && (
              <div className="spinner-border spinner-border-sm text-light ms-2"></div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutEdit;
