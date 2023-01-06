const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = 3000
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5173'
    }
})

io.on('connection', socket => {
    console.log('User connected')

    socket.on('startChat', name => {
        socket.join(name)
    })

    socket.on('messageToBack', data => {
        socket.to(data.room).emit('messageToFront', data)
    })
})

server.listen(port, () => console.log('Server is running'))



