const socket = io()

const chatForm = document.getElementById('chat-form')
socket.on('message', (messagedg) => {
    console.log(messagedg)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value
    socket.emit('chatmessage', msg)
})