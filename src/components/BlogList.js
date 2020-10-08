import React from 'react'
import Blog from './Blog'


const BlogList = ( { user, blogs }) => {

    return (
     <div className="mx-48 max-w-lg">
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user}/>)}
        </div>
      </div>
    )
          }
export default BlogList