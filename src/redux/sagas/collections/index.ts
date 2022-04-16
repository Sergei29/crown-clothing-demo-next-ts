import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  getCollectionsError,
  getCollectionsSuccess,
} from "../../actions/collections"
import { Collection, CollectionsAction } from "../../../types"
import { NEXT_PUBLIC_APP_URL } from "../../../constants"

const getPosts = () =>
  axios.get<Collection[]>(`${NEXT_PUBLIC_APP_URL}/api/collections`)

function* getCollectionsSaga(): any {
  try {
    const response = yield call(getPosts)

    yield put(getCollectionsSuccess(response.data))
  } catch (error) {
    const message = (error as Error).message || "Failed fetch collections"
    yield put(getCollectionsError(message))
  }
}

export function* collectionsSaga() {
  yield all([
    takeLatest(CollectionsAction.GET_COLLECTIONS_START, getCollectionsSaga),
  ])
}
