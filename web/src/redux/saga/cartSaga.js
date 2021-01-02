import { put, takeLatest, call } from "redux-saga/effects";
import { addItem, addItemSuccess, addItemFail } from "../actions/cartAction";
import restConnector from "../../connectors/RestConnector";
// import { message } from 'antd'

function* addItemSaga({ payload }) {
  try {
    console.log('pay', payload)
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

function* addItemWatcher() {
  yield takeLatest(addItem, addItemSaga);
}

export { addItemWatcher };
