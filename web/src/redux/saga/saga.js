import { all } from "redux-saga/effects";

import {
  registerWatcher,
  logInWatcher,
  getUserInfoWatcher,
} from "./accountSaga";

export default function* rootSaga() {
  yield all([
    // account
    logInWatcher(),
    getUserInfoWatcher(),
    registerWatcher(),
  ]);
}
