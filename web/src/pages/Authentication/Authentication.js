import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import clsx from "clsx";

import { Tabs } from "antd";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import "./style.scss";
const { TabPane } = Tabs;

function Authentication(props) {
  const account = useSelector((state) => state.account);
  const [keyTab, setKeyTab] = useState(1);

  useEffect(() => {
    if (account.isAuth) {
      if (account.role !== "admin") props.history.push("/");
      else props.history.push("/admin");
      console.log("account in auth", account);
      // else props.history.push("/");
    }
  }, [account.isAuth]);

  function callback(key) {
    console.log(key);
    setKeyTab(key);
  }

  return (
    <>
      {/* {account.isLoading ? (
        <></>
      ) : ( */}
      <div style={classes.root}>
        <div style={classes.tabContainer}>
          <Tabs
            centered
            defaultActiveKey="1"
            onChange={callback}
            tabBarStyle={classes.tabBarStyle}
          >
            <TabPane
              tab={
                <div
                  className={clsx("tabTitle", keyTab === 1 && "tabTitleActive")}
                >
                  LOGIN
                </div>
              }
              key="1"
            >
              <div style={classes.tabPane}>
                <LoginForm />
              </div>
            </TabPane>
            <TabPane
              tab={
                <div
                  className={clsx("tabTitle", keyTab === 2 && "tabTitleActive")}
                >
                  REGISTER
                </div>
              }
              key="2"
            >
              <div style={classes.tabPane}>
                <RegisterForm />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* )} */}
    </>
  );
}

const classes = {
  root: {
    display: "flex",
    backgroundColor: "#FFD400",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  tabContainer: {
    width: 500,
    backgroundColor: "white",
  },
  tabBarStyle: {
    alignItems: "center",
    width: "100%",
    // backgroundColor: "blueviolet",
    color: "white",
    textAlign: "center",
  },
  tabPane: {
    display: "flex",
    justifyContent: "center",
  },
};

export default withRouter(Authentication);
