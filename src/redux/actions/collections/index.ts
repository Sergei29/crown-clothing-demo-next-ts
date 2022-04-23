import { AnyAction } from "redux"
import axios from "axios"
import {
  CollectionsAction,
  Collection,
  ThunkActionCreator,
} from "../../../types"
import { NEXT_PUBLIC_APP_URL } from "../../../constants"

export const getCollectionsStart = (): AnyAction => ({
  type: CollectionsAction.GET_COLLECTIONS_START,
})

export const getCollectionsSuccess = (
  collections: Collection[]
): AnyAction => ({
  type: CollectionsAction.GET_COLLECTIONS_SUCCESS,
  payload: collections,
})

export const getCollectionsError = (errorMessage: string): AnyAction => ({
  type: CollectionsAction.GET_COLLECTIONS_ERROR,
  payload: errorMessage,
})

export const getCollections =
  (): ThunkActionCreator => async (dispatch, getState) => {
    dispatch(getCollectionsStart())
    try {
      const { data } = await axios.get<Collection[]>(
        `${NEXT_PUBLIC_APP_URL}/api/collections`
      )
      dispatch(getCollectionsSuccess(data))
    } catch (error) {
      const message = (error as Error).message || "Failed fetch collections"
      dispatch(getCollectionsError(message))
    }
  }
