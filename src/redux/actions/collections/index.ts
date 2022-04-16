import { AnyAction } from "redux"
import { CollectionsAction, Collection } from "../../../types"

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
