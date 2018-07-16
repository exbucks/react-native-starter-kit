import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/**
 * Types of actions
 */
import { AppTypes } from '../actions/app'
import { AuthTypes } from '../actions/auth'

/**
 * Sagas
 */
import { loginRequest, getProfiles, usernameAvailable } from './app'
import { gettokenRequest, signupRequest } from './auth'

/**
 * API
 */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/**
 * Connect Types to Sagas
 */
export default function* root() {
  yield all([
    // some sagas receive extra parameters in addition to an action
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(AuthTypes.GETTOKEN_REQUEST, gettokenRequest, api),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signupRequest, api),
    takeLatest(AppTypes.GETPROFILE_REQUEST, getProfiles, api),
    takeLatest(AppTypes.USERNAME_REQUEST, usernameAvailable, api),
  ])
}
