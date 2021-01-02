import { createActions } from "redux-actions";

export const { addItem, addItemSuccess, addItemFail } = createActions(
  "ADD_ITEM",
  "ADD_ITEM_SUCCESS",
  "ADD_ITEM_FAIL",
);
