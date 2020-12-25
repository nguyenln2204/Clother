import React from "react";
import Wrapper from "../../components/Wrapper";
import "./style.scss";
import ProductInfo from "./component/ProductInfo";
import ReviewComponent from "./component/ReviewComponent";

function ProductDetail() {
  return (
    <div className="root">
      <ProductInfo />
      <br />
      <ReviewComponent />
    </div>
  );
}

export default Wrapper()(ProductDetail);
