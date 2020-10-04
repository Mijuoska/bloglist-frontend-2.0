import React from 'react'
import Blog from './Blog'


const BlogList = ( { user, blogs }) => {

    return (
     <div>
        <h3>List of blogs</h3>
        <div className="blog-list">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}/>)}
        </div>
      </div>
      )
}

export default BlogList