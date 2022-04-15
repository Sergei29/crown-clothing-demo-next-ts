import { AnyAction } from "redux"
import { PostsAction, PostType } from "../../../types"

export const getPostsStart = (): AnyAction => ({
  type: PostsAction.GET_POSTS_START,
})

export const getPostsSuccess = (posts: PostType): AnyAction => ({
  type: PostsAction.GET_POSTS_SUCCESS,
  payload: posts,
})

export const getPostsError = (errorMessage: string): AnyAction => ({
  type: PostsAction.GET_POSTS_ERROR,
  payload: errorMessage,
})
