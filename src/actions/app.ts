import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Login
  loginRequest: ['payload'],
  loginSuccess: null,
  loginFailure: null,
})

export const AppTypes = Types
export default Creators
