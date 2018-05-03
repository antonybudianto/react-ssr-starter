import { combineReducers } from 'redux'
import { userAgentReducer } from './user-agent'
import { userReducer } from './user'

export default combineReducers({
  user: userReducer,
  userAgent: userAgentReducer
})
