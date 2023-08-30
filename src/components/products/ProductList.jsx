import React from "react";
import "./productList.css";
import Product from "../product/Product";

const ProductList = ({productList}) => {
  return (
    <div className="products">
      {productList.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  );
};
export default ProductList;
