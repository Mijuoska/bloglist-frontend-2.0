import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'

const initialState = null

export const logIn = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(
            {
                type: 'LOGIN',
                data: user
            }
        )
    }
}
export const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export const fetchUser = () => {
    return async dispatch => {
        let user = initialState
        const loggedUser = window.localStorage.getItem('loggedInUser')
          if (loggedUser) {
              user = JSON.parse(loggedUser)
              blogService.setToken(user.token)
          }
        dispatch(
            {
              type: 'GET_USER',
              data: user
            }
        )
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(
            {
             type: 'ALL',
             data: users
            }

        )
    }
}


export const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN': {
            return action.data
        } case 'LOGOUT': {
            return action.data
        } case 'GET_USER': {
            return action.data
        } default: {
            return state
        }
    } 

}

export const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'ALL':{
            return action.data
        } default: {
            return state
        }
    }
}
