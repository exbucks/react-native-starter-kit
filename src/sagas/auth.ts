import { put } from 'redux-saga/effects'
import { equals } from 'ramda'
import AuthActions from '../actions/auth'
import { NavigationActions } from 'react-navigation'

export function* gettokenRequest(api, action) {
  const { payload } = action
  const response = yield api.getChallengeToken(payload)
  if (equals(response.data.status, 'success')) {
    yield put(AuthActions.gettokenSuccess(response.data.message))
  } else {
    yield put(AuthActions.gettokenFailure())
  }
}

export function* signupRequest(api, action) {
  const { payload } = action
  const response = yield api.signup(payload)
  if (equals(response.data.status, 'success')) {
    yield put(NavigationActions.navigate({ routeName: 'main' }))
  } else {
    yield put(AuthActions.signupFailure(response.data.message))
  }
}
