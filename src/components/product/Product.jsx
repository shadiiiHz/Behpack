import React from "react";
import "./product.css";
import Button from "../button/Button";
const Product = ({ item }) => {
  const description = item.content.slice(0, 150);
  
  return (
    <>
      <div className="product">
        <img
          src={`http://localhost:8000/storage/product/image/${item.image}`}
          alt=""
          className="productImg"
        />
        <div className="productInfo">
          <span className="productCap">{`Capacity: ${item.capacity}`}</span>

          <span className="productTitle">{item.title}</span>
        </div>
        <div className="productDesc">
          <div
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        <Button text="More" url={`/products/${item.id}`} />
      </div>
    </>
  );
};

export default Product;
