import { createStore, applyMiddleware, Middleware } from "redux"
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import rootSaga from "../sagas"
import { rootReducer } from "../reducers"
import { ReduxStoreType } from "../../types"

const bIsDevelopment = process.env.NODE_ENV === "development"

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const arrMiddlewares: Middleware<any, any, any>[] = [sagaMiddleware]

  const compoundMiddlewares = bIsDevelopment
    ? composeWithDevTools(applyMiddleware(...arrMiddlewares))
    : applyMiddleware(...arrMiddlewares)

  // 2: Add an extra parameter for applying middleware
  const store = createStore(rootReducer, compoundMiddlewares)

  // 3: Run your sagas on server
  ;(store as ReduxStoreType).sagaTask = sagaMiddleware.run(rootSaga)

  // 4: now return the store
  return store as ReduxStoreType
}

export const wrapper = createWrapper(makeStore)
