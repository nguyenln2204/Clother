import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../components/Wrapper";
import { useSelector } from "react-redux";
import { Row, Col, Divider, Image, Radio } from "antd";
// import { Layout, Menu, Breadcrumb, Button } from "antd";

// const { Header, Content, Footer } = Layout;
import "./style.scss";

const plainOptions = ["S", "M", "L"];

const optionsWithDisabled = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L", disabled: true },
];

function ProdctDetail() {
  return (
    <div className="root">
      <Row>
        <Col span={16} style={{ backgroundColor: "blue" }}>
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
        </Col>
        <Col span={8} style={{ backgroundColor: "lightpink" }}>
          <h1>SCORPION T-SHIRT/BLACK</h1>
          <h5 style={{ color: "gray" }}>SKU: FOM0030</h5>
          <Divider style={{ margin: "12px 0px" }}></Divider>
          <h2>600.000VND mô tả</h2>
          <p>
            - Chất liệu 100% cotton 4 chiều nhập khẩu từ Hàn - Họa tiết được in
            trực tiếp lên sản phẩm và có độ bền lâu - Form áo Oversize
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Wrapper()(ProdctDetail);
