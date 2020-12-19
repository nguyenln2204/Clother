import { handleActions } from "redux-actions";

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

const unAuthorizedUser = {
  isAuth: !!localStorage.getItem("isAuth"),
  userId: localStorage.getItem("userId"),
  username: localStorage.getItem("username"),
  name: localStorage.getItem("name"),
  avatar: localStorage.getItem("avatar"),
  email: "",
  phone: "",
  role: "",
};

let defaultState = {
  isLoading: false,
  isAuth: false,
  ...unAuthorizedUser,
  error: null,
};

const accountReducer = handleActions(
  {
    [logIn]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [logInSuccess]: (state) => {
      return {
        ...state,
        isAuth: true,
        error: null,
        isLoading: false,
      };
    },
    [logInFail]: (state, { payload: error }) => {
      return {
        ...state,
        isAuth: false,
        error,
        isLoading: false,
      };
    },
    [getUserInfo]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getUserInfoSuccess]: (
      state,
      { payload: { id, username, email, phone, avatar, name, role } }
    ) => {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        userId: id,
        username,
        email,
        avatar,
        name,
        role,
        error: null,
      };
    },
    [getUserInfoFail]: (state, { payload: error }) => {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        ...unAuthorizedUser,
        error,
      };
    },
    [register]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [registerSuccess]: (state) => {
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    },
    [registerFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false,
      };
    },
  },
  defaultState
);

export default accountReducer;
