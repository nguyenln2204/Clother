import React from "react";
import truncate from "../helper/truncate";

export default function ProductItemBlock(props) {
  const { product } = props;
  const { name, image, price } = product;

  return (
    <div
      style={{
        
        height: 300,
        textAlign: "center",
      }}
    >
      <img src={image[0]} height={250} alt={name} />
      <h4>{truncate(name, 20)}</h4>
      <h3 style={{color: 'blueviolet'}}>{price} VND</h3>
    </div>
  );
}
