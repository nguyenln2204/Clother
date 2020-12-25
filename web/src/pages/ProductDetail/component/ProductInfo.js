import React, { useState } from "react";
import { Row, Col, Image, Radio, Button } from "antd";
import "../style.scss";
import ColorGroupButton from "./ColorGroupButton";
import dummyProduct from "../dummyProduct";
import DescriptionContainer from "./DescriptionContainer";
import InputAmountGroup from "./InputAmountGroup";
import dummyImage from "../../../static/images/t-shirt.png";

function ProductInfo() {
  const [sizeValue, setSizeValue] = useState("S");

  const handleSizeChange = (e) => {
    setSizeValue(e.target.value);
  };

  const handleInputChange = (value) => {
    console.log("amount", value);
  };

  return (
    <div className="root">
      {/* Product Detail */}
      <Row>
        {/* LEFT COMPONENT */}
        <Col span={14} style={{ backgroundColor: "blue" }}>
          <Row>
            <Col span={12}>
              <Image
                // width={100}
                src="https://product.hstatic.net/200000075347/product/img_7046-scaled_46a6acadafa8431f962b07a3b30da793_master.jpg"
              />
            </Col>
            <Col span={12}>
              <Image
                //width={100}
                src="https://product.hstatic.net/200000075347/product/img_7044-scaled_267cf358b41648129d8cbd68007b4467_master.jpg"
              />
            </Col>
          </Row>
          <Row>
            <Image
              // width={100}
              src={dummyImage}
            />
          </Row>
        </Col>

        {/* RIGHT COMPONENT */}
        <Col span={10} style={{ backgroundColor: "lightpink" }}>
          <h1 style={{ fontWeight: 700, fontSize: 28 }}>{dummyProduct.name}</h1>
          <p style={{ color: "#7E7E7E", fontSize: 12 }}>SKU: FOM0030</p>
          <p style={{ fontSize: 38, fontWeight: 300 }}>
            {dummyProduct.price}VND
          </p>
          <Radio.Group
            options={dummyProduct.sizes}
            onChange={handleSizeChange}
            value={sizeValue}
            optionType="button"
            buttonStyle="solid"
            style={{ marginBottom: 12 }}
          />
          <br />
          <ColorGroupButton colorOptions={dummyProduct.colors} />
          <br />
          <InputAmountGroup
            inStock={dummyProduct.inStock}
            handleInputChange={handleInputChange}
          />

          <div style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>
            <Button className="addToCartButton" type="primary">
              ADD TO CART
            </Button>
          </div>
          <DescriptionContainer description={dummyProduct.description} />
          <br />
        </Col>
      </Row>
    </div>
  );
}

export default ProductInfo;
