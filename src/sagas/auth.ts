import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import { equals } from 'ramda'
import AuthActions from '../actions/auth'


export function* gettokenRequest(api, action) {
  const { payload } = action
  const response = yield api.getChallengeToken(payload)

  if (equals(response.data.status, 'success')) {
    yield put(AuthActions.gettokenSuccess(response.data.message))
  } else {
    yield put(AuthActions.gettokenFailure())
  }
}

export function* checktokenRequest(api, action) {
  const { payload } = action
  const response = yield api.checkVerificationToken(payload)

  if (equals(response.data.status, 'success')) {
    yield put(NavigationActions.navigate({ routeName: 'login' }))
  } else {
    yield put(NavigationActions.navigate({ routeName: 'signup' }))
  }
}