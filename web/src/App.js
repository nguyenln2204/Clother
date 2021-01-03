// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/index";
import NotFound from "./pages/NotFound/index";
import Dashboard from "./pages/Admin/Dashboard/index";
import ProductDetail from "./pages/ProductDetail";
import Authentication from "./pages/Authentication/Authentication";
import ProductList from "./pages/ProductList/index";
import Checkout from './pages/Checkout/index'
import { getUserInfo } from "./redux/actions/accountAction";
import { getLocalCart, getLocalCartFail } from './redux/actions/cartAction'

function App() {
  const dispatch = useDispatch();
  const account = useSelector(state => state.account);

  useEffect(() => {
    //get user info
    console.log("app");
    dispatch(getUserInfo());
    dispatch(getLocalCart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop>
        {account.isLoading ? (
          <></>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products/" component={ProductList} />
            <Route path="/product/:productId" component={ProductDetail} />
            <Route path="/checkout" component={Checkout} />
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
