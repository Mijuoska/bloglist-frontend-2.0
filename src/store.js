import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import { loginReducer, userReducer } from './reducers/userReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({blogs: blogReducer, notification: notificationReducer, user: loginReducer, users: userReducer})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store