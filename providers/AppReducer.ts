import { AppContextAction, AppContextState } from 'types'

export const initialState: AppContextState = {
  selected: 'timestamp'
}

export const appReducer = (
  state: AppContextState,
  action: AppContextAction
): AppContextState => {
  switch (action.type) {
    case 'LOAD_STATE_FROM_LOCALSTORAGE': {
      return JSON.parse(action.payload)
    }

    case 'SET_SELECTED': {
      return {
        ...state,
        selected: action.payload
      }
    }

    default:
      return state
  }
}
