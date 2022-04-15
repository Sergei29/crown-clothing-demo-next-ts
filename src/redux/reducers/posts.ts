import { AnyAction } from "redux"
import { HYDRATE } from "next-redux-wrapper"
import { PostsState, PostsAction } from "../../types"

export const INIT_POSTS_STATE: PostsState = {
  loading: false,
  error: null,
  collection: [],
}

export const postsReducer = (
  state = INIT_POSTS_STATE,
  action: AnyAction
): PostsState => {
  switch (action.type) {
    /**
     * @description This will overwrite client state
     */
    case HYDRATE: {
      return { ...action.payload.posts }
    }

    case PostsAction.GET_POSTS_START:
      return { ...state, loading: true, error: null }

    case PostsAction.GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        collection: action.payload,
      }

    case PostsAction.GET_POSTS_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
