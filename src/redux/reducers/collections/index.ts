import { AnyAction } from "redux"
import { CollectionsState, CollectionsAction } from "../../../types"

export const INIT_COLLECTIONS_STATE: CollectionsState = {
  loading: false,
  error: null,
  collection: [],
}

export const colllectionsReducer = (
  state = INIT_COLLECTIONS_STATE,
  action: AnyAction
): CollectionsState => {
  switch (action.type) {
    case CollectionsAction.GET_COLLECTIONS_START:
      return { ...state, loading: true, error: null }

    case CollectionsAction.GET_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        collection: action.payload,
      }

    case CollectionsAction.GET_COLLECTIONS_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
