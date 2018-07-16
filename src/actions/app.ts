import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Login
  loginRequest: ['payload'],
  loginSuccess: null,
  loginFailure: null,

  // Get Profile
  getprofileRequest: ['payload'],
  getprofileSuccess: ['response'],
  getprofileFailure: null,

  // Username availability
  usernameRequest: ['payload'],
  usernameSuccess: null,
  usernameFailure: null,
})

export const AppTypes = Types
export default Creators
