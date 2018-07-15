import { put } from 'redux-saga/effects'
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
    yield put(AuthActions.checktokenSuccess())
  } else {
    yield put(AuthActions.checktokenFailure())
  }
}