import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AuthTypes } from '../actions/auth'

const initialState = Immutable({
  status: '', // done, pending, error
  phone: '',
  pin: '',
})

const gettokenRequest = (state, action) => state.merge({ ...state, phone: action.payload.phone, status: 'pending' })
const gettokenSuccess = (state, action) => state.merge({ ...state, pin: action.response, status: 'done' })
const gettokenFailure = (state, action) => state.merge({ ...state, status: 'error' })

const checktokenRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const checktokenSuccess = (state, action) => state.merge({ ...state, status: 'done' })
const checktokenFailure = (state, action) => state.merge({ ...state, status: 'error' })

export const reducer = createReducer(initialState, {
  [AuthTypes.GETTOKEN_REQUEST]: gettokenRequest,
  [AuthTypes.GETTOKEN_SUCCESS]: gettokenSuccess,
  [AuthTypes.GETTOKEN_FAILURE]: gettokenFailure,

  [AuthTypes.CHECKTOKEN_REQUEST]: checktokenRequest,
  [AuthTypes.CHECKTOKEN_SUCCESS]: checktokenSuccess,
  [AuthTypes.CHECKTOKEN_FAILURE]: checktokenFailure,
})
