import React from "react";
import Parser from "html-react-parser";

export default function DescriptionContainer(props) {
  const { description } = props;
  return (
    <div>
      <h4 style={{ fontWeight: "bold" }}>DESCRIPTION</h4>
      <div>{Parser(description)}</div>
    </div>
  );
}
