const initialState = {
  isLoggedIn: false
}

const TOGGLE_LOGIN = 'TOGGLE_LOGIN'

export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN
  }
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOGIN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn
      }
    default:
      return state
  }
}
