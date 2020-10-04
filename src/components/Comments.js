import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'


const Comments = ({ blogId, comments }) => {

const dispatch = useDispatch()

const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(createComment(blogId, comment))
    event.target.comment.value = ""
}

const CommentForm = () => {
    return (
 <form onSubmit={addComment}>
        <input type="text" name="comment" placeholder="Write a comment"></input>
        <button type="submit">Submit</button>
        </form>
    )
}

    if (comments.length > 0) {
    return (
        <div>
         <h3>Comments</h3>
        <CommentForm/>
    <ul>
    {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
    </ul>
    </div>
    )
    } else {
        return (
            <div>
            <p>This blog doesn't have any comments yet. Be the fist to comment!</p>
        <CommentForm/>

            </div>
        )
    }
}

export default Comments