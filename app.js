require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {

    socket.emit('message', 'welcome to chatchord')
    io.emit('message', 'A user has joined the chatchord')

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chatchord')

    })
    socket.on('chatmessage', msg => {
        io.emit('message', msg)
    })
})
app.use(express.static('./public'))

server.listen(5000, () => {
    console.group('server is listening on port 5000')
})