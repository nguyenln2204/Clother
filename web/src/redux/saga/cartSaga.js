import { put, takeLatest, call } from "redux-saga/effects";
import { 
  addItem, 
  addItemSuccess, 
  addItemFail,
  getLocalCart,
  getLocalCartSuccess,
  getLocalCartFail 
} from "../actions/cartAction";
import restConnector from "../../connectors/RestConnector";
// import { message } from 'antd'

function* addItemSaga({ payload }) {
  try {
    const response = yield call(restConnector.get, `/supProducts/${payload.supProductId}`);
    const productDetail = response.data;
    payload = {
      ...payload,
      productDetail
    }
    let token;
    localStorage.getItem('access_token', token)
    if (token) {
      
    }
    
    yield put(addItemSuccess(payload));
  } catch (error) {
    yield put(addItemFail(error));
  }
}

function* getLocalCartSaga() {
  try {
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log('local cart', cart)
    yield put(getLocalCartSuccess(cart))
  }
  catch (error) {
    yield put(getLocalCartFail(error));
  }
}

function* addItemWatcher() {
  yield takeLatest(addItem, addItemSaga);
}

function* getLocalCartWatcher() {
  yield takeLatest(getLocalCart, getLocalCartSaga);
}

export { addItemWatcher, getLocalCartWatcher };
