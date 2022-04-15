import { combineReducers } from "redux"
import { postsReducer, INIT_POSTS_STATE } from "./posts"
import { RootStateType } from "../../types"

export const OBJ_INIT_STATE: RootStateType = {
  posts: INIT_POSTS_STATE,
}

export const rootReducer = combineReducers<RootStateType>({
  posts: postsReducer,
})

export type AppState = ReturnType<typeof rootReducer>
