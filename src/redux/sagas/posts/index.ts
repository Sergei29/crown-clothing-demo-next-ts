import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { getPostsSuccess, getPostsError } from "../../actions/posts"
import { PostType, PostsAction } from "../../../types"
import { POSTS_URL } from "../../../constants"

const getPosts = () => axios.get<PostType[]>(POSTS_URL)

function* getPostsSaga(): any {
  try {
    const response = yield call(getPosts)

    yield put(getPostsSuccess(response.data))
  } catch (error) {
    const message = (error as Error).message || "Failed fetch posts"
    yield put(getPostsError(message))
  }
}

export function* postsSaga() {
  yield all([takeLatest(PostsAction.GET_POSTS_START, getPostsSaga)])
}
