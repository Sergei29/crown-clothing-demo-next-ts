import { AnyAction } from "redux"
import { UserAction, UserState } from "../../../types"

export const INITIAL_USER_STATE: UserState = {
  loading: false,
  error: null,
  currentUser: null,
}

export const userReducer = (state = INITIAL_USER_STATE, action: AnyAction) => {
  switch (action.type) {
    case UserAction.SIGN_IN_START:
    case UserAction.SIGN_UP_START:
    case UserAction.SIGN_OUT_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case UserAction.SIGN_IN_SUCCESS:
    case UserAction.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        loading: false,
      }
    case UserAction.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        loading: false,
      }
    case UserAction.SIGN_IN_ERROR:
    case UserAction.SIGN_UP_ERROR:
    case UserAction.SIGN_OUT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
