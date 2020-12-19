import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import "./style.scss";
import { getUserInfo } from "../redux/actions/accountAction";

const { Header, Content, Footer } = Layout;

function Wrapper() {
  return function (WrappedComponent) {
    function LayoutWrapper(props) {
      const account = useSelector((state) => state.account);
      const dispatch = useDispatch();
      console.log(1);
      // useEffect(() => {
      //   const token = localStorage.getItem("access_token");
      //   console.log("token", token);
      //   if (token) dispatch(getUserInfo({ token }));
      //   //else dispatch(getUserInfo());
      // }, []);

      useEffect(() => {
        console.log(2);
        console.log("account", account);
      }, []);

      // useEffect(() => {
      //   console.log("account", account);
      //   //if (account.role === "admin") window.location = "/admin";
      // }, [account]);

      return (
        <Layout>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              onClick={(key) => {
                console.log(key);
              }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
              <div style={styles.rightContainer}>
                {account.isAuth ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      localStorage.clear();
                      props.history.go(0);
                      //window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button type="primary">Login</Button>
                  </Link>
                )}
              </div>
            </Menu>
          </Header>
          {/* <div>alo</div> */}
          <Content style={{ margin: "auto", maxWidth: 1200 }}>
            <WrappedComponent
              {...props}

              //account={account}
              // product={product}
            />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      );
    }
    return withRouter(LayoutWrapper);
  };
}

const styles = {
  root: {
    width: "100%",
    display: "flex",
  },
  rightContainer: {
    float: "right",
  },
};

export default Wrapper;
