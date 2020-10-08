import React from 'react'
import Comments from './Comments'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router-dom'


const BlogPage = ({ blog, user }) => {

  const dispatch = useDispatch()
  const history = useHistory()

   const removeBlog = async (event) => {
     const result = window.confirm('Are you sure you want to delete this blog?')
     if (result) {
       const ID = event.target.id
       dispatch(deleteBlog(ID))
       dispatch(setNotification(`Deleted blog`, 'success', 5000))
       history.push('/')
     }

   }

   const addLike = async () => {
     dispatch(likeBlog(blog))
   }

   

  if (!blog) {
    return null
  }
  return (
  
    <div className='blog max-w-md ml-6'>
    <div>
      <h2 className="text-lg font-bold">{blog.title} by {blog.author}</h2>
         <p><a className="text-blue-600 hover:text-blue-400 hover:no-underline underline" href={`${blog.url}`} target="_blank">{blog.url}</a></p>
         <p className="mt-4">
       {blog.likes} likes <button className="ml-2 rounded border-solid-blue-700 bg-blue-700 pl-2 pr-2 pt-1 pb-1 text-white" id={blog.id} onClick={addLike}>Like</button>
       </p>
       <p className="italic mt-4 mb-4">
        Added by {blog.user.name}
        </p>
        <button className="mb-4 bg-red-600 rounded pt-1 pb-1 pr-2 pl-2 text-white" style={{ display: user.id === blog.user.id ? '' : 'none' }} id={blog.id} onClick={removeBlog}>Delete</button>
        <hr/>
        </div>
        <Comments blogId = {blog.id} comments={blog.comments}/>
  
        </div>
  )
}

export default BlogPage
