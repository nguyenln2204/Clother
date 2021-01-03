import { put, takeLatest, call } from "redux-saga/effects";
import restConnector from "../../connectors/RestConnector";

import { 
  createOrder, 
  createOrderSuccess, 
  createOrderFail,
  
} from "../actions/orderAction";

function* createOrderSaga({ payload }) {
  try {
    console.log('order payload', payload)
    const { orderInfo, cartList } = payload
    const token = localStorage.getItem('access_token')
    console.log('token', token)
    let newPayload;
    if (!token) {
      // anonymous account
      let accountId = "5fecc36bb2fefc3f608dad81"
      newPayload = {
        ...orderInfo, 
        accountId
      }
    }
    const response = yield call(restConnector.post, `/orders/`, {
      ...newPayload
    })
    console.log('responst', response)

    if (response.status === 200) {
      let orderId = response.data.id
      

    }


    // const response = yield call(restConnector.get, `/supProducts/${payload.supProductId}`);
    // const productDetail = response.data;
    // payload = {
    //   ...payload,
    //   productDetail
    // }
    // let token;
    // localStorage.getItem('access_token', token)
    // if (token) {
      
    // }
    
    // yield put(createOrderSuccess(payload));
  } catch (error) {
    yield put(createOrderFail(error));
  }
}

function* createOrderWatcher() {
  yield takeLatest(createOrder, createOrderSaga);
}

export { createOrderWatcher };
