const URLparams = new URLSearchParams(window.location.search)
const username = URLparams.get('username')
const roomname = URLparams.get('roomname')

const socket = io()

socket.emit('userJoined',({username, roomname}))