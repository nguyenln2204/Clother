import { createActions } from "redux-actions";

export const { 
  addItem, 
  addItemSuccess, 
  addItemFail, 
  getLocalCart,
  getLocalCartSuccess,
  getLocalCartFail,
 } = createActions(
  "ADD_ITEM",
  "ADD_ITEM_SUCCESS",
  "ADD_ITEM_FAIL",
  "GET_LOCAL_CART",
  "GET_LOCAL_CART_SUCCESS",
  "GET_LOCAL_CART_FAIL",
);
