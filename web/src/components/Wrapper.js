import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons'
import "./style.scss";
// import { getUserInfo } from "../redux/actions/accountAction";
import CartDrawer from "./CartDrawer";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

function Wrapper() {
  return function (WrappedComponent) {
    function LayoutWrapper(props) {
      const account = useSelector(state => state.account);
      const cart = useSelector(state => state.cart)
      const { cartList } = cart;
      const [visible, setVisible] = useState(false);
      
      useEffect(() => {
        console.log("account", account);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      const showDrawer = () => {
        setVisible(true);
      };

      const onClose = () => {
        setVisible(false);
      };

      return (
        <Layout style={{ backgroundColor: "white" }}>
          <Header style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}>
            <div className="logo" />
            <Menu
              // theme="dark"
              style={{ backgroundColor: "transparent" }}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              onClick={(key) => {
                console.log(key);
              }}
            >
              <Menu.Item className="navbarMenuItem" key="1" onClick={() => props.history.push('/')}>
                ABOUT US
              </Menu.Item>
              <SubMenu className="navbarSubMenu" key="sub" title="ALL ITEMS">
                <Menu.Item key="2">ALL ITEMS</Menu.Item>
                <Menu.Item key="3">T-Shirt</Menu.Item>
                <Menu.Item key="4">Sweater</Menu.Item>
                <Menu.Item key="5">Hoodies</Menu.Item>
                <Menu.Item key="6">Jacket</Menu.Item>
                <Menu.Item key="7">Pants</Menu.Item>
              </SubMenu>
              <Menu.Item className="navbarMenuItem" key="8">
                COLLECTIONS
              </Menu.Item>

              <div style={styles.rightContainer}>
                {account.isAuth ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      localStorage.clear();
                      props.history.go(0);
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
          <Content
            style={{
              margin: "auto",
              maxWidth: 1200,
              width: "85%",
              minWidth: 1000,
            }}
          >
            <WrappedComponent
              {...props}
            />
            <Button
              style={styles.cartButton}
              type="primary"
              onClick={showDrawer}
            >
              <ShoppingCartOutlined /> {cartList.length}
            </Button>
            <CartDrawer visible={visible} onClose={onClose} />
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
  cartButton: {
    position: "fixed",
    top: 80,
    right: 50,
  },
};

export default Wrapper;
