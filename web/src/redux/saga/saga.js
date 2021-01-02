import { all } from "redux-saga/effects";

import {
  registerWatcher,
  logInWatcher,
  getUserInfoWatcher,
} from "./accountSaga";

import { addItemWatcher } from "./cartSaga";

export default function* rootSaga() {
  yield all([
    // account
    logInWatcher(),
    getUserInfoWatcher(),
    registerWatcher(),

    // cart
    addItemWatcher(),
  ]);
}
