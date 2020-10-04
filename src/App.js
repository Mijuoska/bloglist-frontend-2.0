import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, deleteBlog, addBlog, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  // Get blogs and notifications
  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)

// fetch logged in user from local storage and set user
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])


  useEffect(() => {
   dispatch(initializeBlogs())
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

  const removeBlog = async (event) => {
    const result = window.confirm('Are you sure you want to delete this blog?')
    if (result) {
      const ID = event.target.id
      dispatch(deleteBlog(ID))
      dispatch(setNotification(`Deleted blog`, 'success', 5000))
    }

  }

  const addLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    dispatch(likeBlog(blog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (ex) {
      dispatch(setNotification(`Wrong username or password`, 'error', 5000))
    }
  }

  const logOut = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }



  if (user === null) {
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
        <span>Hi {user.name}!</span><button onClick={() => logOut()}>Logout</button>
      </p>

      <Notification message={message.content} messageType={message.messageType}/>
      <Togglable buttonLabel='new Blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>
      <div>
        <h3>List of blogs</h3>
        <div className="blog-list">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} likeBlog={()=>addLike(blog.id)}/>)}
        </div>
      </div>
    </div>
  )
}
export default App
