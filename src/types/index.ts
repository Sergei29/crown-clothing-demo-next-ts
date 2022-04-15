import { Task } from "redux-saga"
import { Store as ReduxStore, AnyAction } from "redux"

export enum CollectionsAction {
  GET_COLLECTIONS_START = "GET_COLLECTIONS_START",
  GET_COLLECTIONS_SUCCESS = "GET_COLLECTIONS_SUCCESS",
  GET_COLLECTIONS_ERROR = "GET_COLLECTIONS_ERROR",
}

export type RootStateType = {
  collections: CollectionsState
}

export type ReduxStoreType = {
  sagaTask: Task
} & ReduxStore<RootStateType, AnyAction>

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

export type CollectionsState = {
  loading: boolean
  error: null | string
  collection: Collection[]
}
