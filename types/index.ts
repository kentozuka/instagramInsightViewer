import { Metric } from '.prisma/client'
import { Dispatch } from 'react'

export type AppContextType = {
  state: AppContextState | null
  dispatch: Dispatch<AppContextAction>
}

type Red = Exclude<keyof Metric, 'key' | 'id'>
export type SortType = Red | 'timestamp'
export interface AppContextState {
  selected: SortType
}

export type AppContextAction = LoadStateAction | SetSelectedAction

interface LoadStateAction {
  type: 'LOAD_STATE_FROM_LOCALSTORAGE'
  payload: string
}

interface SetSelectedAction {
  type: 'SET_SELECTED'
  payload: SortType
}
