import React from "react";
import truncate from "../helper/truncate";

export default function ProductItemBlock(props) {
  const { product } = props;
  const { name, image, price } = product;

  return (
    <div
      style={{
        width: 250,
        height: 300,
        backgroundColor: "yellow",
        textAlign: "center",
      }}
    >
      <img src={image[0]} height={250} alt={name} />
      <h3>{truncate(name, 20)}</h3>
      <p>{price}</p>
    </div>
  );
}
