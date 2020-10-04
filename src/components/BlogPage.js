import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogPage = ({ blog, user }) => {

  const dispatch = useDispatch()

   const removeBlog = async (event) => {
     const result = window.confirm('Are you sure you want to delete this blog?')
     if (result) {
       const ID = event.target.id
       dispatch(deleteBlog(ID))
       dispatch(setNotification(`Deleted blog`, 'success', 5000))
     }

   }

   const addLike = async () => {
     dispatch(likeBlog(blog))
   }

  if (!blog) {
    return null
  }
  return (
  

    <div className='blog'>
      <h2>{blog.title} by {blog.author}</h2>
         <p><a href={`${blog.url}`} target="_blank">{blog.url}</a></p>
         <p>
       {blog.likes} likes <button id={blog.id} onClick={addLike}>Like</button>
       </p>
       <p>
        Added by {blog.user.name}
        </p>
        <button style={{ display: user.id === blog.user.id ? '' : 'none' }} id={blog.id} onClick={removeBlog}>Delete</button>
    </div>
  )
}

export default BlogPage
