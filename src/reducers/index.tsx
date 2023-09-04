import { combineReducers } from 'redux'
import app from './app'
import dev from './dev'

export default combineReducers({
    app,
    dev
})