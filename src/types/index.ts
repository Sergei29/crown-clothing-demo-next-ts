import { ThunkAction } from "redux-thunk"
import { Store as ReduxStore, AnyAction } from "redux"
export * from "./reactElementTypes"

export enum CollectionsAction {
  GET_COLLECTIONS_START = "GET_COLLECTIONS_START",
  GET_COLLECTIONS_SUCCESS = "GET_COLLECTIONS_SUCCESS",
  GET_COLLECTIONS_ERROR = "GET_COLLECTIONS_ERROR",
}

export enum UserAction {
  SIGN_IN_START = "SIGN_IN_START",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_ERROR = "SIGN_IN_ERROR",
  CHECK_USER_SESSION = "CHECK_USER_SESSION",
  SIGN_OUT_START = "SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
  SIGN_OUT_ERROR = "SIGN_OUT_ERROR",
  SIGN_UP_START = "SIGN_UP_START",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_ERROR = "SIGN_UP_ERROR",
}

export enum CartAction {
  GET_SHOPPING_CART_START = "GET_SHOPPING_CART_START",
  GET_SHOPPING_CART_SUCCESS = "GET_SHOPPING_CART_SUCCESS",
  GET_SHOPPING_CART_ERROR = "GET_SHOPPING_CART_ERROR",
  SAVE_SHOPPING_CART_START = "GET_SHOPPING_CART_START",
  SAVE_SHOPPING_CART_SUCCESS = "GET_SHOPPING_CART_SUCCESS",
  SAVE_SHOPPING_CART_ERROR = "GET_SHOPPING_CART_ERROR",
  DELETE_SHOPPING_CART_START = "GET_SHOPPING_CART_START",
  DELETE_SHOPPING_CART_SUCCESS = "GET_SHOPPING_CART_SUCCESS",
  DELETE_SHOPPING_CART_ERROR = "GET_SHOPPING_CART_ERROR",
  ADD_ITEM_TO_SHOPPING_CART = "ADD_ITEM_TO_SHOPPING_CART",
  REMOVE_ITEM_FROM_SHOPPING_CART = "REMOVE_ITEM_FROM_SHOPPING_CART",
  CLEAR_SHOPPING_CART_ITEMS = "CLEAR_SHOPPING_CART_ITEMS",
}

export type CollectionName =
  | "mens"
  | "hats"
  | "jackets"
  | "sneakers"
  | "hats"
  | "womens"

export type Entity = {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type Directory = {
  size: string
  title: string
  imageUrl: string
  linkUrl: string
  order: number
} & Entity

export type CollectionItem = {
  imageUrl: string
  name: string
  price: number
  quantity: number
  collectionId: string
} & Entity

export type Collection = {
  title: string
  imageUrl: string
  linkUrl: string
  items: CollectionItem[]
} & Entity

export type CollectionSummary = {
  title: string
  imageUrl: string
  linkUrl: string
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
  name: string
  email: string
  password?: string
} & Entity

export type UserInput = {
  name: string
  email: string
  password?: string
}

export type CollectionsState = {
  loading: boolean
  error: null | string
  collection: Collection[]
}

export type UserDisplay = {
  id: string
  name: string
  email: string
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  name: string
} & SignInCredentials

export type UserState = {
  loading: boolean
  error: null | string
  currentUser: UserDisplay | null
}

export type ShoppingCartState = {
  loading: boolean
  error: null | string
  cart: ShoppingCart | null
}

export type RootStateType = {
  collections: CollectionsState
  user: UserState
  cart: ShoppingCartState
}

export type ThunkActionCreator = ThunkAction<any, RootStateType, any, any>

export type Store = ReduxStore<RootStateType, any>
