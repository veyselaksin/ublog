import axios from 'axios'
import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('')

    const onSubmit = async event => {
        event.preventDefault()

        await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return (
        <div className={'container'}>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className='form-control' />
                </div>
                <button className='btn btn-primary mt-2 mb-2'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate
