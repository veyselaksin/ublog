import { useState } from 'react'
import axios from 'axios'

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const onSubmit = async e => {
        e.preventDefault()
        await axios.post('http://localhost:3000/posts', { title })
        setTitle('')
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default PostCreate
