
const socket = io()

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const userList = document.getElementById('users')

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit('joinRoom', { username, room })
socket.on('message', (theMessage) => {

    outputMessage(theMessage)
    chatMessages.scrollTop = chatMessages.scrollHeight
    console.log(chatMessages.scrollHeight)
    console.log(chatMessages.scrollTop)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value

    socket.emit('chatmessage', msg)

    e.target.elements.msg.value = " "
})

const outputMessage = (message) => {
    console.log(message)
    const div = document.createElement('div')
    div.classList.add('message')
    const p = document.createElement('p')
    p.classList.add('meta')
    p.innerText = message.username
    p.innerHTML += `  <span>${message.time}</span>`
    console.log(p.innerText)
    div.appendChild(p)
    // const chatMessages = document.querySelector('.chat-messages')
    const para = document.createElement('p')
    p.classList.add('text')
    para.innerText = message.text
    div.appendChild(para)
    chatMessages.appendChild(div)
    const arr = []
    for (let i = 0; i < message.roomUsers.length; i++) {
        const lists = document.querySelectorAll('.text2')
        const texts = Array.from(lists).map(list => list.innerText);
        console.log(texts);

        const msg = message.roomUsers[i].username;
        console.log(msg)
        arr.push(msg)
        if (!texts.includes(msg)) {
            const user = document.createElement('li')
            user.classList.add('text2')
            user.innerText = message.roomUsers[i].username
            userList.appendChild(user)
        } else {
            console.log(msg)
        }

    }
    const lists1 = document.querySelectorAll('.text2')
    const listed = Array.from(lists1)
    const texts1 = Array.from(lists1).map(list => list.innerText);


    //    const texts = message.roomUsers.map(user => user.username);

    // Remove list items that are not in the message.roomUsers array
    // const listItems = document.querySelectorAll('.text2');
    console.log(texts1)
    console.log(arr)
    texts1.forEach(text1 => {
        if (!arr.includes(text1)) {
            console.log(text1)
            const listee = listed.find((list1) => list1.innerText == text1)
            // const lister = listed.splice(listee, 1)
            userList.removeChild(listee);
            console.log(listee)
        }
    });





}