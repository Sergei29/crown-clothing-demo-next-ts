import { AnyAction } from "redux"
import axios from "axios"
import {
  UserAction,
  UserDisplay,
  ThunkActionCreator,
  SignUpCredentials,
} from "../../../types"
import { NEXT_PUBLIC_APP_URL } from "../../../constants"

export const signInStart = () => ({
  type: UserAction.SIGN_IN_START,
})

export const signInSuccess = (currentUser: UserDisplay): AnyAction => ({
  type: UserAction.SIGN_IN_SUCCESS,
  payload: currentUser,
})

export const signInError = (errorMessage: string): AnyAction => ({
  type: UserAction.SIGN_IN_ERROR,
  payload: errorMessage,
})

export const checkUserSession = () => ({
  type: UserAction.CHECK_USER_SESSION,
})

export const signOutStart = () => ({
  type: UserAction.SIGN_OUT_START,
})

export const signOutSuccess = () => ({
  type: UserAction.SIGN_OUT_SUCCESS,
})

export const signOutError = (errorMessage: string) => ({
  type: UserAction.SIGN_OUT_ERROR,
  payload: errorMessage,
})

export const signUpStart = () => ({
  type: UserAction.SIGN_UP_START,
})

export const signUpSuccess = (currentUser: UserDisplay) => ({
  type: UserAction.SIGN_UP_SUCCESS,
  payload: currentUser,
})

export const signUpError = (errorMessage: string) => ({
  type: UserAction.SIGN_UP_ERROR,
  payload: errorMessage,
})

export const registerUser =
  (newCredentials: SignUpCredentials): ThunkActionCreator =>
  async (dispatch, getState) => {
    const { name, email, password } = newCredentials
    dispatch(signUpStart())
    try {
      const { data } = await axios.post<UserDisplay>(
        `${NEXT_PUBLIC_APP_URL}/api/register`,
        {
          name,
          email,
          password,
        }
      )
      dispatch(signUpSuccess(data))
    } catch (error) {
      const message =
        (error as Error).message || `Failed to register user ${name}`
      dispatch(signUpError(message))
    }
  }
