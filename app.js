require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const formatMessages = require('./utils/formatMessages')
const { joinUsers, getCurrentUsers } = require('./utils/users')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        console.log(socket.id)
        const user = joinUsers(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formatMessages('chatbox', 'welcome to chatchord'))
        socket.broadcast.to(user.room).emit('message', formatMessages('chatbox', `${user.username} has joined the chatchord`))

    })
    socket.on('chatmessage', msg => {
        const user = getCurrentUsers(socket.id)
        io.to(user.room).emit('message', formatMessages(user.username, msg))
    })

    socket.on('disconnect', () => {
        console.log(socket.id)
        const user = getCurrentUsers(socket.id)
        console.log(user)

        socket.emit('message', formatMessages('chatbox', 'You left the chatchord'))
        socket.broadcast.emit('message', formatMessages('chatbox', 'A user has left the chatchord'))

    })

})
app.use(express.static('./public'))

server.listen(5000, () => {
    console.group('server is listening on port 5000')
})