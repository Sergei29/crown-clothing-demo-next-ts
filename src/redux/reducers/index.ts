import { combineReducers } from "redux"
import { colllectionsReducer, INIT_COLLECTIONS_STATE } from "./collections"
import { userReducer, INITIAL_USER_STATE } from "./user"
import { RootStateType } from "../../types"

export const OBJ_INIT_STATE: RootStateType = {
  collections: INIT_COLLECTIONS_STATE,
  user: INITIAL_USER_STATE,
}

export const rootReducer = combineReducers<RootStateType>({
  collections: colllectionsReducer,
  user: userReducer,
})

export type AppState = ReturnType<typeof rootReducer>
