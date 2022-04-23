import {
  createStore,
  applyMiddleware,
  Middleware,
  AnyAction,
  Reducer,
} from "redux"
import { createWrapper, HYDRATE } from "next-redux-wrapper"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { rootReducer } from "../reducers"
import { RootStateType } from "../../types"

const bindMiddlware = (middleware: Middleware<any, any, any>[]) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const reducer: Reducer<RootStateType, AnyAction> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddlware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore, {
  debug: process.env.NODE_ENV !== "production",
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
})
