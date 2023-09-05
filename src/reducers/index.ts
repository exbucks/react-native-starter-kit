import {combineReducers} from 'redux'
import appReducer from './app'
import isLoadingReducer from './isLoading'
import errorReducer from './error'

const rootReducer = combineReducers({
    app: appReducer,
    isLoading: isLoadingReducer,
    error: errorReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
