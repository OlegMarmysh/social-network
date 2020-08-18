import { getAuthUserData, AuthThunkType } from './authReducer'
import { appActions } from './appActions'
import { BaseThunkType, InferActionsType } from './reduxStore'

const initialState = {
  initialized: false
}

type AppState = typeof initialState
type AppActions = InferActionsType<typeof appActions>

const { initializedSuccess } = appActions

const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state
  }
}

type AppThunkType = BaseThunkType<AppActions, void>

export const initializeApp = (): AppThunkType | AuthThunkType => async dispatch => {
  const promise = dispatch(getAuthUserData())
  await Promise.all([promise])
  dispatch(initializedSuccess())
}

export default appReducer
