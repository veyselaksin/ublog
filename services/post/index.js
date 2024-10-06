import express from 'express'
import { randomBytes } from 'crypto'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = []

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).send({ message: 'Title is required' })
    }
    const id = randomBytes(4).toString('hex')
    posts.push({ id, title })

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: { id, title }
    })

    res.status(201).send({ id, title })
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({})
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
