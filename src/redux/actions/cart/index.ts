import { AnyAction } from "redux"
import axios from "axios"
import {
  ThunkActionCreator,
  CartAction,
  ShoppingCart,
  ShoppingCartItem,
} from "../../../types"
import { NEXT_PUBLIC_APP_URL } from "../../../constants"

const getShoppingCartStart = (): AnyAction => ({
  type: CartAction.GET_SHOPPING_CART_START,
})

const getShoppingCartSuccess = (cart: ShoppingCart): AnyAction => ({
  type: CartAction.GET_SHOPPING_CART_SUCCESS,
  payload: cart,
})

const getShoppingCartError = (errorMessage: string): AnyAction => ({
  type: CartAction.GET_SHOPPING_CART_ERROR,
  payload: errorMessage,
})

export const getShoppingCart =
  (userId: string): ThunkActionCreator =>
  async (dispatch, getState) => {
    // fetch from `/api/cart`
  }

const saveShoppingCartStart = (): AnyAction => ({
  type: CartAction.SAVE_SHOPPING_CART_START,
})

const saveShoppingCartSuccess = (): AnyAction => ({
  type: CartAction.SAVE_SHOPPING_CART_SUCCESS,
})

const saveShoppingCartError = (errorMessage: string): AnyAction => ({
  type: CartAction.SAVE_SHOPPING_CART_ERROR,
  payload: errorMessage,
})

export const saveShoppingCart =
  (cart: ShoppingCart): ThunkActionCreator =>
  async (dispatch, getState) => {
    // save at `/api/cart`
  }

const deleteShoppingCartStart = (): AnyAction => ({
  type: CartAction.DELETE_SHOPPING_CART_START,
})

const deleteShoppingCartSuccess = (): AnyAction => ({
  type: CartAction.DELETE_SHOPPING_CART_SUCCESS,
})

const deleteShoppingCartError = (errorMessage: string): AnyAction => ({
  type: CartAction.DELETE_SHOPPING_CART_ERROR,
  payload: errorMessage,
})

export const deleteShoppingCart =
  (cartId: string): ThunkActionCreator =>
  async (dispatch, getState) => {
    // delete cart at `/api/cart`
  }
