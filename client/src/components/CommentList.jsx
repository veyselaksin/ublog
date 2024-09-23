import axios from 'axios'
import { useState, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const CommentList = ({ postId }) => {
    const [comments, setComments] = useState({})
    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:3001/posts/${postId}/comments`)
        setComments(res.data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <ul>
            {Object.values(comments).map(comment => (
                <li key={comment.id}>{comment.content}</li>
            ))}
        </ul>
    )
}

export default CommentList
