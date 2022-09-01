const URLparams = new URLSearchParams(window.location.search)
const username = URLparams.get('username')
const roomname = URLparams.get('roomname')

const sendButton = document.getElementById('send')

const socket = io()
socket.emit('joinRoom',({username, roomname}))

socket.on('receiveMessage', (message) => {
    console.log('I received a message!')
    const chatLog = document.getElementById('chatLog')
    var newMessage = document.createElement("div")
    newMessage.innerText = message;
    chatLog.appendChild(newMessage)
})

sendButton.addEventListener('click', (e) => {
    const message = document.getElementById('message').value
    socket.emit('sendMessage', message)
    const chatLog = document.getElementById('chatLog')
    var newMessage = document.createElement("div")
    newMessage.innerText = message;
    chatLog.appendChild(newMessage)
})