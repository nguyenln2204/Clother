import { all } from "redux-saga/effects";

import {
  registerWatcher,
  logInWatcher,
  getUserInfoWatcher,
} from "./accountSaga";

import { addItemWatcher,getLocalCartWatcher } from "./cartSaga";
import { createOrderWatcher } from './orderSaga'

export default function* rootSaga() {
  yield all([
    // account
    logInWatcher(),
    getUserInfoWatcher(),
    registerWatcher(),

    // cart
    addItemWatcher(),
    getLocalCartWatcher(),

    // order
    createOrderWatcher(),
  ]);
}
