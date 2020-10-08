import React, { useState } from 'react'


const BlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogSubmit = async(event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }



  return (
    <div className="border-solid border-grey-300 rounded border-2 p-4 max-w-md" >
    <h3 className="mb-3">Submit a blog</h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
  Title: <input className="border border-2 border-gray-500 rounded-r px-2 w-full py-1"type="text" name="Title" id="title" value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
     Author: <input className="border border-2 border-gray-500 rounded-r px-2 w-full py-1" type="text" name="Author" id="author" value={author}  onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
     Url: <input className="border border-2 border-gray-500 rounded-r px-2 w-full py-1" type="text" name="Url" id="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button className="mt-4 bg-green-700 rounded pb-1 pt-1 pl-2 pr-2 text-white" type="submit">Create</button>
      </form>

    </div>
  )
}

export default BlogForm