import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ( { user }) => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

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


    return (
     <div>
        <h3>List of blogs</h3>
        <div className="blog-list">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} removeBlog={removeBlog} likeBlog={()=>addLike(blog.id)}/>)}
        </div>
      </div>
      )
}

export default BlogList