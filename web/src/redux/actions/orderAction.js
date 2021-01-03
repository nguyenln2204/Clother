import { createActions } from "redux-actions";

export const {
  createOrder,
  createOrderSuccess,
  createOrderFail,
} = createActions(
  "CREATE_ORDER",
  "CREATE_ORDER_SUCCESS",
  "CREATE_ORDER_FAIL",
)