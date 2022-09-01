const URLparams = new URLSearchParams(window.location.search)
const username = URLparams.get('username')
const roomname = URLparams.get('roomname')

const sendButton = document.getElementById('send')

const socket = io()
socket.emit('joinRoom',({username, roomname}))

sendButton.addEventListener('click', (e) => {
    const message = document.getElementById('message').value
    socket.emit('sendMessage', message)
})

socket.on('receiveMessage', ({message, user}) => {
    const chatLog = document.getElementById('chatLog')
    const newMessage = document.createElement("div")
    newMessage.innerText = user.username + ": " + message;
    chatLog.appendChild(newMessage)
})

socket.on('updateUsersOnline', ({roomUsers}) => {
    const userList = document.getElementById('userList')
    userList.innerHTML = ""
    roomUsers.forEach(roomUser => {
        li = document.createElement('li')
        li.innerHTML = roomUser.username
        userList.appendChild(li)
    });
})