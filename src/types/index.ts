import { Task } from "redux-saga"
import { Store as ReduxStore } from "redux"

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export type PostsState = {
  loading: boolean
  error: null | string
  collection: PostType[]
}

export enum PostsAction {
  GET_POSTS_START = "GET_POSTS_START",
  GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS",
  GET_POSTS_ERROR = "GET_POSTS_ERROR",
}

export type RootStateType = {
  posts: PostsState
}

export type ReduxStoreType = {
  sagaTask: Task
} & ReduxStore
