import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, NavLink, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogPage from './components/BlogPage'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { getUsers, fetchUser, logIn, logOut} from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import blogs from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setActive] = useState({'blogs': true, 'users': false})


  const blogFormRef = useRef()
  const dispatch = useDispatch()

  // Get blogs and notifications
  const blogs = useSelector(state => state.blogs)
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


const Menu = () => {
  return (
  <nav className="border-solid mb-8 pb-6 pt-4 pr-8 pl-4 bg-gray-600 text-white pl-4">
        <span className="text-md font-bold">The Blog List</span>
  <NavLink className= "ml-6 hover:text-blue-800"
  to = '/'> Blogs </NavLink><NavLink
  className="ml-4 hover:text-blue-800" to='/users'>Users</NavLink>
  <span className="float-right">Hi {loggedInUser.name}!<button 
  className="ml-3 border-solid border-2 border-black pb-2 pt-1 pl-1 pr-1 rounded bg-black hover:bg-white hover:text-black hover:border-black" onClick={() => handleLogout()}>Logout</button></span>
  </nav>
  )
}

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

const userMatch = useRouteMatch('/users/:id')
const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null

const blogMatch = useRouteMatch('/blogs/:id')
const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

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
    <div className="container mx-auto">
          <Menu/>
      <Switch>
      <Route path="/blogs/:id">
      <BlogPage blog={blog} user={loggedInUser}/>
      </Route>
      <Route path="/users/:id">
      <User user={user}/>
      </Route>
       <Route path="/users">
      <Users users={users}/>
      </Route>
      <Route path="/">
      <Notification message={message.content} messageType={message.messageType}/>
      <div className="container flex flex-col">
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <BlogList user={loggedInUser} blogs={blogs}/>
      </div>
      </Route>
          </Switch>
    </div>
  )
}
export default App
