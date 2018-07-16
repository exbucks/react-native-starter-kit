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
})

export const AppTypes = Types
export default Creators
