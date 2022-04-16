import { all, fork } from "redux-saga/effects"
import { collectionsSaga } from "./collections"

export default function* rootSaga() {
  yield all([fork(collectionsSaga)])
}
