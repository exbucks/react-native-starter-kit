import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get auth token
  gettokenRequest: ['payload'],
  gettokenSuccess: ['response'],
  gettokenFailure: null,

  signupRequest: ['payload'],
  signupSuccess: null,
  signupFailure: ['response'],
})

export const AuthTypes = Types
export default Creators
