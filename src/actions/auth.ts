import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Login
  loginRequest: ['payload'],
  loginSuccess: null,
  loginFailure: null,

  // Get auth token
  gettokenRequest: ['payload'],
  gettokenSuccess: null,
  gettokenFailure: null,

  checktokenRequest: ['payload'],
  checktokenSuccess: null,
  checktokenFailure: null,
})

export const AuthTypes = Types
export default Creators
