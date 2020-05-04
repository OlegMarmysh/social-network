import { getAuthUserData, AuthThunkType } from './authReducer'
import { appActions, INITIALIZED_SUCCESS } from './appActions'
import { InferActionsType } from './reduxStore'
import { ThunkAction } from 'redux-thunk'

const initialState = {
  initialized: false
}

type AppState = typeof initialState

type AppActions = InferActionsType<typeof appActions>
const { initializedSuccess } = appActions

const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      }
    }
    default:
      return state
  }
}

type AppThunkType = ThunkAction<Promise<void>, AppState, unknown, AppActions>

export const initializeApp = (): AppThunkType | AuthThunkType => async (dispatch: any) => {
  const promise = dispatch(getAuthUserData())
  await Promise.all([promise])
  dispatch(initializedSuccess())
}

export default appReducer
