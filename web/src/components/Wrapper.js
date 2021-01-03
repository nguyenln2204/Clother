import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import "./style.scss";
import logo from '../static/images/LOGO_1.svg'
import clotherImage from '../static/images/clother.png'
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
      // const cartList = JSON.parse(localStorage.getItem('cart')) || []
      const [visible, setVisible] = useState(false);
      const [category, setCategory] = useState()

      const fetchCategory = () => {
        const backendURL = process.env.REACT_APP_BASE_URL;
        let apiURL = "";

        apiURL = backendURL + `/categories/`;
        fetch(apiURL)
          .then(response => response.json())
          .then(response =>  {
            setCategory(response)
          })
          .catch((err) => console.log(err));
      }
      
      useEffect(() => {
  
        fetchCategory()
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
          <Header style={{ zIndex: 99, backgroundColor: "rgba(255, 255, 255, 0.3)", position: 'fixed', width: "100%" }}>
            <div  className="logo" onClick={() => props.history.push('/')}
              style={{
                position: 'fixed', 
                top: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 99,
                cursor: 'pointer'
              }}>
              <img src={logo} alt="logo" width={320} />
            </div>
            <Menu
              // theme="dark"
              style={{ backgroundColor: "transparent" }}
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              onClick={(e) => {
                console.log(parseInt(e.key));
                if (parseInt(e.key) === 2) props.history.push('/products/all-items')
              }}
            >
                
              <Menu.Item className="navbarMenuItem" key="1">
                ABOUT US
              </Menu.Item>
              <SubMenu 
                className="navbarSubMenu" 
                key="sub" 
                title="ALL ITEMS" 
                onTitleClick={() => props.history.push('/products/all-items')}
              >
                <Menu.Item key="2">ALL ITEMS</Menu.Item>
                {
                  category?.map((item, index) => {
                    return(
                      <Menu.Item 
                        key={index+3} 
                        onClick={() => { props.history.push(`/products/${item.name.toLowerCase()}`)}}
                      >{item.name}</Menu.Item>
                    )
                  })
                }
                {/* <Menu.Item key="3">T-Shirt</Menu.Item>
                <Menu.Item key="4">Sweater</Menu.Item>
                <Menu.Item key="5">Hoodies</Menu.Item>
                <Menu.Item key="6">Jacket</Menu.Item>
                <Menu.Item key="7">Pants</Menu.Item> */}
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
              marginTop: 150,
              position: 'relative'
            }}
          >
            {
              props.history.location.pathname.split('/').length>2 ?
              <div onKeyPress={(e) => { if (e.which===13) props.history.push('/products/all-items')}} style={{position: 'absolute', right: 0, width: 350, borderBottom: "1px solid black", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Input bordered={false} placeholder="Search an item..."/>
                <SearchOutlined style={{fontSize: 20}}/>
              </div>
              : null
            }
           
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
          <div style={{marginTop: 100}}>
            <img src={clotherImage} alt='clother' style={{height: 'auto', maxWidth: '100%'}}/>
          </div>
          <Footer style={{ textAlign: "center", marginTop: 100 }}>
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
