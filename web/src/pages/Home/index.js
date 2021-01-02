import React from "react";
// import { connect } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../components/Wrapper";
// import { useSelector } from "react-redux";
import { Button } from "antd";
// import { Layout, Menu, Breadcrumb, Button } from "antd";
import bannerImage from '../../static/images/banner.png'

// const { Header, Content, Footer } = Layout;

function Home(props) {
  return (
    <div>
      <div style={{ height: 500, marginBottom: 50, marginTop: -150,}}>
        <img style={{width: "100%", maxHeight: '100%', objectFit: 'cover' }} src={bannerImage} alt="banner"/>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{fontSize: 28, color: 'blueviolet', fontWeight: 600}}>Best Sellers</h1>
        <Button type='primary' onClick={() => props.history.push("/products/all-items")}>
          ALL ITEMS
        </Button>
      </div>
    </div>
  );
}

export default Wrapper()(Home);
