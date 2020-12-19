// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/index";
import NotFound from "./pages/NotFound/index";
// import LayoutWrapper from "./components/LayoutWrapper";
import Authentication from "./pages/Authentication/Authentication";
import "antd/dist/antd.css";
import { getUserInfo } from "./redux/actions/accountAction";
import Dashboard from "./pages/Admin/Dashboard/index";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import store from "./redux/store";
import { browserHistory } from "@version/react-router-v3";
import ProductDetail from "./pages/ProductDetail";
const history = syncHistoryWithStore(browserHistory, store);

function App() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  useEffect(() => {
    //get user info
    console.log("app");
    dispatch(getUserInfo());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop>
        {account.isLoading ? (
          <></>
        ) : (
          <Switch>
            <Route path="/" exact component={ProductDetail} />
            <Route path="/auth" exact component={Authentication} />
            <Route path="/admin" exact component={Dashboard} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        )}
      </ScrollToTop>
    </Router>
  );
}

export default App;
