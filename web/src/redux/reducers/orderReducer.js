import { handleActions } from "redux-actions";
import { message } from "antd";

import { 
  createOrder, 
  createOrderSuccess, 
  createOrderFail,
  
} from "../actions/orderAction";

let defaultState = {
  isLoading: false,
  error: null,
};

const orderReducer = handleActions(
  {
    [createOrder]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [createOrderSuccess]: (state) => {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    },
    [createOrderFail]: (state, { payload: error }) => {
      return {
        ...state,
        error,
        isLoading: false,
      };
    },
  }, 
  defaultState
);

export default orderReducer