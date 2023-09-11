import React from "react";
import "./product.css";
import Button from "../button/Button";
const Product = ({ item }) => {
  const description = item.content.slice(0, 100);
  
  return (
    <>
      <div className="product">
        <img
          src={`https://behpack.com/backend/storage/public/product/image/${item.image}`}
          alt=""
          className="productImg"
        />
        <div className="productInfo">
          <span className="productCap">{`Capacity: ${item.capacity} PPM`}</span>

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
