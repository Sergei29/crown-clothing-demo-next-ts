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

export type CollectionName =
  | "mens"
  | "hats"
  | "jackets"
  | "sneakers"
  | "hats"
  | "womens"

export type Entity = {
  id: string
  createdAt: string
  updatedAt: string
}

export type CollectionItem = {
  imageUrl: string
  name: string
  price: number
  collectionId: string
} & Entity

export type Collection = {
  title: CollectionName
  items: CollectionItem[]
} & Entity

export type ShoppingCartItem = {
  imageUrl: string
  name: string
  price: number
  quantity: number
  cartId: string
  collectionItemId: string
} & Entity

export type ShoppingCart = {
  items: ShoppingCartItem[]
  userId: string
} & Entity

export type User = {
  name?: string
  email: string
  password: string
} & Entity
