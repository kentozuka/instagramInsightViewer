import { createContext, useContext, useEffect, useReducer } from 'react'
import { appReducer, initialState } from './AppReducer'
import { AppContextType } from 'types'

let init = false

export const AppContext = createContext<AppContextType>(null)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    const name = 's'
    if (init) return localStorage.setItem(name, JSON.stringify(state))

    dispatch({
      type: 'LOAD_STATE_FROM_LOCALSTORAGE',
      payload: localStorage.getItem('s')
    })
    init = true
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
