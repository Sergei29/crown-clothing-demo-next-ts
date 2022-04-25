import { AnyAction } from "redux"
import { CartAction, ShoppingCartState } from "../../../types"

export const INITIAL_CART_STATE: ShoppingCartState = {
  loading: false,
  error: null,
  cart: null,
}

export const shoppingCartReducer = (
  state = INITIAL_CART_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case CartAction.GET_SHOPPING_CART_START:
    case CartAction.SAVE_SHOPPING_CART_START:
    case CartAction.DELETE_SHOPPING_CART_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case CartAction.GET_SHOPPING_CART_SUCCESS:
    case CartAction.ADD_ITEM_TO_SHOPPING_CART:
    case CartAction.REMOVE_ITEM_FROM_SHOPPING_CART:
    case CartAction.CLEAR_SHOPPING_CART_ITEMS:
      return {
        ...state,
        error: null,
        loading: false,
        cart: action.payload,
      }
    case CartAction.SAVE_SHOPPING_CART_SUCCESS:
    case CartAction.DELETE_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      }
    case CartAction.GET_SHOPPING_CART_ERROR:
    case CartAction.SAVE_SHOPPING_CART_ERROR:
    case CartAction.DELETE_SHOPPING_CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
