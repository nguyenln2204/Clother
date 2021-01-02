import React from "react";
// import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../components/Wrapper";
// import { useSelector } from "react-redux";
import { Button } from "antd";
// import { Layout, Menu, Breadcrumb, Button } from "antd";

// const { Header, Content, Footer } = Layout;

function Home(props) {
  return (
    <div>
      <h1>Best Sellers</h1>
      <Button onClick={() => props.history.push("/products/all-items")}>
        ALL ITEMS
      </Button>
    </div>
  );
}

export default Wrapper()(Home);
