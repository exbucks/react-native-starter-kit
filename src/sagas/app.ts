import { call, put } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import AppActions from '../actions/app'

export function* loginRequest(api, action) {
  const { payload } = action
  const response = yield api.loginByEmail(payload)
  if (response.ok) {
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
