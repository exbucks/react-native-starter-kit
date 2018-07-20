import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { equals } from 'ramda'
import AppActions from '../actions/app'

export function* loginRequest(api, action) {
  const { payload } = action
  const response = yield api.loginByEmail(payload)
  console.log('&&&&&', response)
  const auth_token = response.data.auth_token //need to save to the localstorage
  const user_id = response.data.user_id //need to save to the localstorage
  const user_feed = response.data.userfeed //need to save to the localstorage
  if (equals(response.data.status, 'success')) {
    yield put(NavigationActions.navigate({ routeName: 'main' }))
  } else {
    yield put(AppActions.loginFailure())
  }
}

export function* getProfiles(api, action) {
  const { payload } = action
  const response = yield api.getProfiles(payload)
  if (response.ok) {
    yield put(AppActions.getprofileSuccess(response.data))
  } else {
    yield put(AppActions.getprofileFailure())
  }
}

export function* usernameAvailable(api, action) {
  const { payload } = action
  const response = yield api.usernameAvailable(payload)
  if (equals(response.data.status, 'success')) {
    yield put(AppActions.usernameSuccess())
  } else {
    yield put(AppActions.usernameFailure())
  }
}
