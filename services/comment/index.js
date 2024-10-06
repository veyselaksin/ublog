import express from 'express'
import { randomBytes } from 'crypto'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsById = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsById[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body
    if (!content) {
        return res.status(400).send({ message: 'Content is required' })
    }
    const id = randomBytes(4).toString('hex')
    const comments = commentsById[req.params.id] || []
    comments.push({ id, content })
    commentsById[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: { id, content, postId: req.params.id }
    })

    res.status(201).send(comments)
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({})
})

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
