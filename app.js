const path = require ('path')
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { SocketAddress } = require('net');
const io = new Server(server);

app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

port = 8888

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/room', (req, res) => {
    res.render('room')
})

app.post('/room', (req, res) => {
    username = req.body.username,
    roomname = req.body.roomname
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user DCed..')
    })

    socket.on('userJoined', ({username, roomname}) => {
        console.log(`${username} joined ${roomname}`)
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
