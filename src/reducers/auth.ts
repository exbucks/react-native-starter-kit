import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AuthTypes } from '../actions/auth'

const initialState = Immutable({
  status: '', // done, pending, error
  phone: '',
  pin: '',
  message: '',
})

const gettokenRequest = (state, action) =>
  state.merge({ ...state, phone: action.payload.phone, status: 'pending' })
const gettokenSuccess = (state, action) =>
  state.merge({ ...state, pin: action.response, status: 'done' })
const gettokenFailure = (state, action) => state.merge({ ...state, status: 'error' })

const signupRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const signupSuccess = (state, action) => state.merge({ ...state, status: 'success' })
const signupFailure = (state, action) =>
  state.merge({ ...state, message: action.response, status: 'error' })

export const reducer = createReducer(initialState, {
  [AuthTypes.GETTOKEN_REQUEST]: gettokenRequest,
  [AuthTypes.GETTOKEN_SUCCESS]: gettokenSuccess,
  [AuthTypes.GETTOKEN_FAILURE]: gettokenFailure,

  [AuthTypes.SIGNUP_REQUEST]: signupRequest,
  [AuthTypes.SIGNUP_SUCCESS]: signupSuccess,
  [AuthTypes.SIGNUP_FAILURE]: signupFailure,
})
