import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../../static/images/background_image.png";
import logoImage from "../../static/images/LOGO_1.svg";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7), 
      rgba(0, 0, 0, 0.7)
    ),
    url(${backgroundImage})`,
    backgroundColor: "yellow", //used if the image is unavailable
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  container: {
    width: 400,
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
  },
  tab: {
    backgroundColor: "#868686",
    color: "#464646",
    width: "100%",
    border: "none",
    cursor: "pointer",
    height: 50,
    outline: "none",
    fontSize: 14,
    fontWeight: 600,
  },
  activeTab: {
    color: "white",
    backgroundColor: "#D76411",
  },
  tabContent: {
    backgroundColor: "rgba(0, 0, 0, 0.49)",
  },
  leftContainer: {
    marginRight: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: -80,
  },
}));

function Authentication(props) {
  const classes = useStyles();
  const account = useSelector(state => state.account);
  const [keyTab, setKeyTab] = useState(0);

  useEffect(() => {
    if (account.isAuth) {
      if (account.role !== "admin") props.history.push("/");
      else props.history.push("/admin");
      console.log("account in auth", account);
      // else props.history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className={classes.root}>
        <div className={classes.leftContainer}>
          <img src={logoImage} width={500} alt="logo" />
          <p style={{ color: "white", fontSize: 16 }}>
            "People will stare. Make it worth their while."
          </p>
          <h4 style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            — Harry Winston
          </h4>
        </div>
        <div className={classes.container}>
          <div className={classes.tabContainer}>
            <button
              className={clsx(classes.tab, keyTab === 0 && classes.activeTab)}
              onClick={() => callback(0)}
              id={`simple-tab-${0}`}
            >
              LOGIN
            </button>
            <button
              className={clsx(classes.tab, keyTab === 1 && classes.activeTab)}
              onClick={() => callback(1)}
              id={`simple-tab-${1}`}
            >
              REGISTER
            </button>
          </div>
          <div className={classes.tabContent}>
            {keyTab === 0 ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default withRouter(Authentication);
