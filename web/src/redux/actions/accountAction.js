import { createActions } from "redux-actions";

export const {
  logIn,
  logInSuccess,
  logInFail,
  register,
  registerSuccess,
  registerFail,
  getUserInfo,
  getUserInfoSuccess,
  getUserInfoFail,
} = createActions(
  "LOG_IN",
  "LOG_IN_SUCCESS",
  "LOG_IN_FAIL",
  "REGISTER",
  "REGISTER_SUCCESS",
  "REGISTER_FAIL",
  "GET_USER_INFO",
  "GET_USER_INFO_SUCCESS",
  "GET_USER_INFO_FAIL"
);
