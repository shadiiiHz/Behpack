import React from "react";
import "./announcement.css";
import Button from "../button/Button";
const Announcement = ({ item }) => {
  const description = item.content.slice(0, 200);
  return (
    <>
      <div className="announcement">
        <img src={`http://localhost:8000/storage/post/image/${item.image}`} alt="" className="announcementImg" />

        <span className="announcementTitle">{item.title}</span>

        <div className="announcementDesc">
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <Button text="More" url={`/news/${item.id}`} />
      </div>
    </>
  );
};

export default Announcement;
