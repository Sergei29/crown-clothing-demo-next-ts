import { combineReducers } from "redux"
import { colllectionsReducer, INIT_COLLECTIONS_STATE } from "./collections"
import { RootStateType } from "../../types"

export const OBJ_INIT_STATE: RootStateType = {
  collections: INIT_COLLECTIONS_STATE,
}

export const rootReducer = combineReducers<RootStateType>({
  collections: colllectionsReducer,
})

export type AppState = ReturnType<typeof rootReducer>
