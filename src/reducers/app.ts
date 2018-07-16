import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AppTypes } from '../actions/app'

const initialState = Immutable({
  status: '', // done, pending, error
  profileData: [],
})

const loginRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const loginSuccess = (state, action) => state.merge({ ...state, status: 'done' })
const loginFailure = (state, action) => state.merge({ ...state, status: 'error' })

const getprofileRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const getprofileSuccess = (state, action) =>
  state.merge({ ...state, profileData: action.response, status: 'done' })
const getprofileFailure = (state, action) => state.merge({ ...state, status: 'error' })

const usernameRequest = (state, action) => state.merge({ ...state, status: 'checking' })
const usernameSuccess = (state, action) => state.merge({ ...state, status: 'available' })
const usernameFailure = (state, action) => state.merge({ ...state, status: 'unavailable' })

export const reducer = createReducer(initialState, {
  [AppTypes.LOGIN_REQUEST]: loginRequest,
  [AppTypes.LOGIN_SUCCESS]: loginSuccess,
  [AppTypes.LOGIN_FAILURE]: loginFailure,

  [AppTypes.GETPROFILE_REQUEST]: getprofileRequest,
  [AppTypes.GETPROFILE_SUCCESS]: getprofileSuccess,
  [AppTypes.GETPROFILE_FAILURE]: getprofileFailure,

  [AppTypes.USERNAME_REQUEST]: usernameRequest,
  [AppTypes.USERNAME_SUCCESS]: usernameSuccess,
  [AppTypes.USERNAME_FAILURE]: usernameFailure,
})
