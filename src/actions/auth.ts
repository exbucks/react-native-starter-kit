import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get auth token
  gettokenRequest: ['payload'],
  gettokenSuccess: ['response'],
  gettokenFailure: null,

  checktokenRequest: ['payload'],
  checktokenSuccess: null,
  checktokenFailure: null,
})

export const AuthTypes = Types
export default Creators
