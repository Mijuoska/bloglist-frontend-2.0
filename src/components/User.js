import React from 'react'

const User = ( { user } ) => {
    if(!user) {
        return null
    }
    return (
    <div className="ml-12">
    <h2 className="text-lg font-semibold">{user.name}</h2>
    <div className="mt-4">
    <h3 className="text-md">{user.blogs.length > 0 ? "This user has added the following blogs" : "This user hasn't added any blogs yet"}</h3>
    <ul className="mt-4 list-disc">
    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
    </div>
    </div>
    )
}

export default User