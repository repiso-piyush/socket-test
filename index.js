const express = require('express')
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const socketio = require('socket.io')
const io = socketio(server);

let users = {};
io.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('send-msg',(data)=>{
        console.log(users);
        io.emit('recieved-msg',{
           msg:data.msg,
           username: users[socket.id]
        })
       
    })
    socket.on('login',(data)=>{
        users[socket.id] = data.username;
        console.log(users);
    })
    
})
app.use('/',express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    res.send({
        message:"Hello World"
    })
})
server.listen(4000,()=>{
    console.log('Server is running on port 4000')
})