import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

export const createClientStore = initialState => {
  const composeEnhancers = __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose
  const store = createDefaultStore(initialState, composeEnhancers)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      console.log('Root reducer updated')
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
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
