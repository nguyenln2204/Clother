import { handleActions } from "redux-actions";
import { message } from "antd";

import { 
  addItem, 
  addItemSuccess, 
  addItemFail,
  getLocalCart,
  getLocalCartSuccess,
  getLocalCartFail,
} from "../actions/cartAction";

let defaultState = {
  isLoading: false,
  totalPrice: 0,
  cartList: [],
  error: null,
};

const cartReducer = handleActions(
  {
    [addItem]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [addItemSuccess]: (state, { payload }) => {
      let newList = state.cartList;
      console.log('newwww', newList)
      // if (payload.quantity !== 0) {
      let isExist = false;
      state.cartList.forEach((item) => {
        if (
          item.supProductId === payload.supProductId &&
          item.productDetail.size === payload.productDetail.size
        ) {
          isExist = true;
          item.quantity = payload.quantity;
        }
      });
      if (!isExist) {
        newList.push(payload);
        message.success("Add to Cart Success");
      }
      // }
      // else {
      //   let index = newList.indexOf(payload)
      //   console.log('index', index)
      //   newList.splice(index, 1)
      // }
      let total = 0;
      console.log("new", newList);
      newList.forEach((item) => {
        total += item.quantity * item.price;
      });
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.setItem("cart", JSON.stringify(newList));
      localStorage.setItem("totalPrice", total);
      return {
        ...state,
        error: null,
        cartList: newList,
        isLoading: false,
        totalPrice: total,
      };
    },
    [addItemFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false,
      };
    },
    [getLocalCart]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [getLocalCartSuccess]: (state, {payload}) => {
      return {
        ...state,
        isLoading: false,
        cartList: payload,
        error: null
      };
    },
    [getLocalCartFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false,
      };
    },
  },
  defaultState
);

export default cartReducer;
