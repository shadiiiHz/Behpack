import React from "react";
import "./news.css";
import Announcement from "../announcement/Announcement";

const News = ({newsList}) => {
  return (
    <div className="news">
      {newsList.map((item) => (
        <Announcement item={item} key={item.id} />
      ))}
    </div>
   
  );
};

export default News;
