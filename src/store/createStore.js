import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export const createClientStore = initialState => {
  const composeEnhancers = __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose
  return createDefaultStore(initialState, composeEnhancers)
}

const createDefaultStore = (initialState = {}, composeEnhancers = compose) => {
  const middleware = [thunk]
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  )
  return store
}

export default createDefaultStore
