const path = require('path')
const {users, addUser, getUser} = require('./public/userlist.js')

const express = require('express')
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

port = 8888

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/room', (req, res) => {
    res.render('room.ejs')
})

app.post('/room', (req, res) => {
    username = req.body.username,
    roomname = req.body.roomname
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, roomname}) => {
        console.log(`${username} with id ${socket.id} joined ${roomname}`)
        addUser(socket.id, username, roomname)
        socket.join(roomname)
        console.log(`${socket.rooms.forEach((e) => console.log(e))}`)
    })

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id)
        console.log(`room IS ${user.roomname}`)
        socket.broadcast.to(user.roomname).emit('receiveMessage', message)
    })

    socket.on('disconnect', () => {
        console.log(`User with id ${socket.id} disconnected`)
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
