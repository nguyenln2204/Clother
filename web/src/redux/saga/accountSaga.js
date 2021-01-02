import { call, put, takeLatest } from "redux-saga/effects";
import get from "lodash/get";
import restConnector from "../../connectors/RestConnector";
import { message } from "antd";
// import { goBack, push } from "react-router-redux";
import {
  logIn,
  logInSuccess,
  logInFail,
  register,
  registerSuccess,
  registerFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
} from "../actions/accountAction";

function* logInSaga({ payload }) {
  try {
    console.log("1", window.location);
    const response = yield call(restConnector.post, "/accounts/login", {
      ...payload,
    });
    const token = response.data.id;
    localStorage.setItem("access_token", token);
    restConnector.setAccessTokenHeader();
    const response_1 = yield call(restConnector.get, `/accounts/me`);
    let data = get(response_1, "data", {});
    yield put(getUserInfoSuccess(data));
    yield put(logInSuccess());
    message.success("Login Succesfully!");
  } catch (error) {
    // console.log(error);
    // let errorMessage = get(
    //   error,
    //   "response.data.error.message",
    //   "Đăng nhập lỗi"
    // );
    // if (errorMessage === "login failed" && errorMessage.length > 40) {
    //   errorMessage = "Đăng nhập lỗi";
    // }
    yield put(logInFail(error));
    message.warning("Invalid email or password!");
  }
}

function* getUserInfoSaga() {
  try {
    const response = yield call(restConnector.get, `/accounts/me`);
    let data = get(response, "data", {});
    console.log("response get me", data);
    console.log("address", window.location.href);
    yield put(getUserInfoSuccess(data));
    // yield put(push("/"));
    // if (data.role !== "admin") {
    //   console.log("in");
    //   if (window.location.href.includes("http://localhost:3000/admin"))
    //     yield put(push("/"));
    //   else yield put(goBack());
    // } else if (data.role === "admin") {
    //   if (window.location.href.includes("http://localhost:3000/auth"))
    //     yield put(push("/admin"));
    // }
  } catch (error) {
    yield put(getUserInfoFail(error));
  }
}

function* registerSaga({ payload }) {
  try {
    const data = yield call(restConnector.post, "/accounts", payload);
    yield put(logIn(payload));
    yield put(registerSuccess(data));
    //window.history.back();

    // successAlert('Đăng ký thành công')
    //window.history.push('/profile')
  } catch (error) {
    yield put(registerFail(error));
    let errorMessage = get(error, "response.data.error.message", "Đăng ký lỗi");
    if (errorMessage.indexOf("Email already exists") > -1) {
      errorMessage = "Tài khoản đã được sử dụng";
      message.warning("Email already exist!");
    }
    if (errorMessage.length > 40) {
      errorMessage = "Đăng ký lỗi";
    }
  }
}

function* logInWatcher() {
  yield takeLatest(logIn, logInSaga);
}

function* getUserInfoWatcher() {
  yield takeLatest(getUserInfo, getUserInfoSaga);
}

function* registerWatcher() {
  yield takeLatest(register, registerSaga);
}

export { registerWatcher, logInWatcher, getUserInfoWatcher };
