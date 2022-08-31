const URLparams = new URLSearchParams(window.location.search)
const username = URLparams.get('username')
const roomname = URLparams.get('roomname')

const socket = io()

socket.emit('userJoined',({username, roomname}))

const sendButton = document.getElementById('send')
sendButton.addEventListener('click', (e) => {
    const chatLog = document.getElementById('chatLog')
    const message = document.getElementById('message').value
    var newMessage = document.createElement("div")
    newMessage.innerText = message;
    chatLog.appendChild(newMessage)
})