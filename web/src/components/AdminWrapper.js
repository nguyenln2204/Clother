import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import "./style.scss";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import { getUserInfo } from "../redux/actions/accountAction";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminWrapper(props) {
  return function (WrappedComponent) {
    function LayoutWrapper(props) {
      const account = useSelector((state) => state.account);
      // const dispatch = useDispatch();
      console.log("account", account);
      const [collapsed, setCollapsed] = useState(false);

      useEffect(() => {
        //dispatch(getUserInfo());
        if (account.role !== "admin") props.history.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        console.log(1);
        //if (!account.isAuth && !account.isLoading) window.location = "/";
      }, [account]);

      const onCollapse = (collapsed) => {
        console.log(collapsed);
        setCollapsed(collapsed);
      };

      return (
        <>
          {account.isLoading ? (
            <></>
          ) : (
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                  </Menu.Item>
                  <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div style={styles.rightContainer}>
                    <Button
                      type="primary"
                      onClick={() => {
                        localStorage.clear();
                        window.location = "/";
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    Bill is a cat.
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©2018 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          )}
        </>
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

export default AdminWrapper;
