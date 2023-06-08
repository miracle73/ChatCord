require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    console.log('New Web Connection')

    socket.emit('message', 'welcome to chatchord')
})
app.use(express.static('./public'))

server.listen(5000, () => {
    console.group('server is listening on port 5000')
})