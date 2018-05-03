const initialState = null

const INIT_UA = 'APP/INIT_UA'

export function initUserAgent(data) {
  return {
    type: INIT_UA,
    payload: data
  }
}

export function userAgentReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_UA: {
      return {
        ...action.payload,
        isMobile:
          ['mobile', 'tablet'].indexOf(action.payload.device.type) !== -1
      }
    }
    default: {
      return state
    }
  }
}
