import blogService from '../services/blogs'


export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: "INIT_BLOGS",
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        dispatch({
            type:"NEW BLOG",
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    const likedBlog = {...blog, likes: 1}
    return async dispatch => {
        const updatedBlog = await blogService.updateBlog(blog.id, likedBlog)
        
        dispatch({
            type:"LIKE BLOG",
            data: updatedBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const deletedBlog = await blogService.deleteBlog(id)
        dispatch({
            type:"DELETE BLOG",
            data: {id: id}
        })
    }
}

export const createComment = (id, comment) => {
    return async dispatch => {
        const newComment = await blogService.createComment(id, comment)
        dispatch({
            type:"ADD COMMENT",
            data: {blogId: newComment.blog, content: newComment.content, id: newComment.id}
        })
    }
}

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW BLOG': {
            const newBlogs = [...state, action.data]
            return newBlogs.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1
            } else if (b.likes > a.likes) {
                return 1
            } else {
                return 0
            }
            })
        }
        case 'LIKE BLOG': {
            return state.map(blog => blog.id !== action.data.id ? blog : action.data)
            
        }
        case 'DELETE BLOG': {
            const remainingBlogs = state.filter(blog => blog.id !== action.data.id)
            return remainingBlogs.sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1
                } else if (b.likes > a.likes) {
                    return 1
                } else {
                    return 0
                }
            })
        } case 'ADD COMMENT': {
            const commentedBlog = state.find(blog => blog.id === action.data.blogId)
            const newComment = {id: action.data.id, content: action.data.content}
            commentedBlog.comments = [...commentedBlog.comments, newComment]
            return state.map(blog => commentedBlog.id !== blog.id ? blog : commentedBlog)
        } 
        
        case 'INIT_BLOGS': {
            return action.data.sort((a, b) => {
                if(a.likes > b.likes) {
                    return -1
                } else if (b.likes > a.likes) {
                    return 1
                } else {
                    return 0
                }
            })
        } default:
        return state
    }   
}

export default blogReducer