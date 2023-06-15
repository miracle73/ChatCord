require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const formatMessages = require('./utils/formatMessages')
const { joinUsers, getCurrentUsers, removeUser, getRoomUsers } = require('./utils/users')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {
        console.log(socket.id)
        const user = joinUsers(socket.id, username, room)
        socket.join(user.room)
        const roomUsers = getRoomUsers(user.room)
        socket.emit('message', formatMessages('chatbox', 'welcome to chatchord', roomUsers))
        socket.broadcast.to(user.room).emit('message', formatMessages('chatbox', `${user.username} has joined the chatchord`, roomUsers))

    })
    socket.on('chatmessage', msg => {
        const user = getCurrentUsers(socket.id)
        const roomUsers = getRoomUsers(user.room)
        io.to(user.room).emit('message', formatMessages(user.username, msg, roomUsers))
    })

    socket.on('disconnect', () => {

        const user = removeUser(socket.id)
        if (user) {
            const roomUsers = getRoomUsers(user.room)
            socket.emit('message', formatMessages('chatbox', 'You left the chatchord', roomUsers))
            socket.broadcast.to(user.room).emit('message', formatMessages('chatbox', `A ${user.username} has left the chatchord`, roomUsers))
        }



    })

})
app.use(express.static('./public'))

server.listen(5000, () => {
    console.group('server is listening on port 5000')
})