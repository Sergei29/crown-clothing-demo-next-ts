import { combineReducers } from "redux"
import { colllectionsReducer, INIT_COLLECTIONS_STATE } from "./collections"
import { userReducer, INITIAL_USER_STATE } from "./user"
import { shoppingCartReducer, INITIAL_CART_STATE } from "./cart"
import { RootStateType } from "../../types"

export const OBJ_INIT_STATE: RootStateType = {
  collections: INIT_COLLECTIONS_STATE,
  user: INITIAL_USER_STATE,
  cart: INITIAL_CART_STATE,
}

export const rootReducer = combineReducers<RootStateType>({
  collections: colllectionsReducer,
  user: userReducer,
  cart: shoppingCartReducer,
})

export type AppState = ReturnType<typeof rootReducer>
