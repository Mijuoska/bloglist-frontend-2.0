import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { getUsers, fetchUser, logIn, logOut} from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const blogFormRef = useRef()
  const dispatch = useDispatch()

  // Get blogs and notifications
  const message = useSelector(state => state.notification)
  const loggedInUser = useSelector(state => state.user)
  const users = useSelector(state => state.users)

// fetch logged in user from local storage and set user
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

// fetch all blogs
  useEffect(() => {
   dispatch(initializeBlogs())
  }, [dispatch])

  // fetch all users
useEffect(() => {
  dispatch(getUsers())
}, [dispatch])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
    dispatch(addBlog(blogObject))
      dispatch(setNotification(`Added new blog: ${blogObject.title} by ${blogObject.author}`, 'success', 5000))
    } catch (ex) {
      dispatch(setNotification(`Something went wrong with adding a new blog`, 'error', 5000))
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logIn(username, password))
      setUsername('')
      setPassword('')
    } catch (ex) {
      dispatch(setNotification(`Wrong username or password`, 'error', 5000))
    }
  }

  const handleLogout = async () => {
    dispatch(logOut())
  }

const match = useRouteMatch('/users/:id')
const user = match ? users.find(user => user.id === match.params.id) : null

  if (loggedInUser === null) {
    return (
      <div>
        <h2>Log in to blog listing app</h2>
        <Notification message={message.content} messageType={message.messageType}/>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }
  return (
    <div>
      <h2>Blog listing</h2>
      <p>
        <span>Hi {loggedInUser.name}!</span><button onClick={() => handleLogout()}>Logout</button>
      </p>
      <Switch>
      <Route path="/users/:id">
      <User user={user}/>
      </Route>
       <Route path="/users">
      <Users users={users}/>
      </Route>
      <Route path="/">
      <Notification message={message.content} messageType={message.messageType}/>
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <BlogList user={loggedInUser}/>
      </Route>
          </Switch>
    </div>
  )
}
export default App
