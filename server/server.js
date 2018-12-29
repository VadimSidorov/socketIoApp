const path = require('path');
const express = require('express');
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(publicPath));
let time = new Date()

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('showMes',[{
    text:"message1"
  },{
    text:"message2"
  }])

  socket.on('disconnect',()=>{
    console.log('User was diconnected')
  })

  socket.on('MyMessage', (data)=>{
    console.log(data, time)
  })

  
})


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});