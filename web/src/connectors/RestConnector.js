import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../constants/constants";
import get from "lodash/get";

const getInstance = () => {
  let config = {
    baseURL,
  };
  // attach access token from local storage to all requests
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = {
      Authorization: token,
    };
  }

  return axios.create(config);
};

let instance = getInstance();

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    err.code = get(err, "response.status", 404);
    err.message = get(err, "response.data.error.message", "Error!");
    if (
      err.code === 401 &&
      //err.config.url !== `/api/accounts/me` &&
      !err.config.url.includes(`/accounts/me`)
    ) {
      // warnAlert('Bạn cần phải đăng nhập trước')
      delete instance.defaults.headers.access_token;
      Cookies.remove("userId");
      Cookies.remove("access_token");
      localStorage.clear();
      //  window.location = "/account";
      console.log("unauthorize");
      console.log(err.config.url);
    }
    return Promise.reject(err);
  }
);

/**
 * On browser, restConnector (axios) doesn't need to care about access_token anymore as we hacked around to let server set
 * access_token to browser on successful login.
 * @param token
 */

instance.setAccessTokenHeader = () => {
  const token = localStorage.getItem("access_token") || "";
  if (token) {
    instance.defaults.headers.common["Authorization"] = token;
  }
};

instance.clearAccessTokenHeader = () => {
  delete instance.defaults.headers["Authorization"];
  delete instance.defaults.headers.common["Authorization"];
};

export default instance;
