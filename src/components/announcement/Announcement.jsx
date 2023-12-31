import React from "react";
import "./announcement.css";
import Button from "../button/Button";
const Announcement = ({ item }) => {
  const description = item.content.slice(0, 100);
  return (
    <>
      <div className="announcement">
        <img src={`https://behpack.com/backend/storage/public/post/image/${item.image}`} alt="" className="announcementImg" />

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
