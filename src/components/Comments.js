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
        <textarea className="border border-2 border-gray-500 rounded-r px-2 w-full py-1" rows={2} name="comment" placeholder="Write a comment"></textarea>
        <button className="border-gray-800 rounded pl-2 pr-2 pt-1 pb-1 bg-gray-800 text-white" type="submit">Submit</button>
        </form>
    )
}

    if (comments.length > 0) {
    return (
        <div className="mt-4">
         <h3 className="text-lg font-semibold">Comments</h3>
        <CommentForm/>
    <ul className="mt-4">
    {comments.map(comment => <li className="border-solid border-gray-200 border-b-2 p-2" key={comment.id}>{comment.content}</li>)}
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