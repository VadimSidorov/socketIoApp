const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, UniqueUser} = require('./utils/validators');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = [];
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  io.emit('UpdateRoomList',rooms)


  socket.on('join', (params, callback)=>{

    if (!isRealString(params.name) || !isRealString(params.room.toLowerCase())){
       return callback('Name and room are required')
    }else{
      if(UniqueUser(params.name, params.room.toLowerCase(), users.users)){return callback('User name has been taken')}

      socket.join(params.room.toLowerCase());
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room.toLowerCase());

      io.to(params.room.toLowerCase()).emit('UpdateUserList', users.getUserList(params.room.toLowerCase()))

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room.toLowerCase()).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
      
      rooms = users.getRoomList(users)
      
      io.emit('UpdateRoomList', rooms)
      
      
      callback();
    }
    
  
  })


  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
  
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, `${coords.latitude}`, `${coords.longitude}`));
    }
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    var user = users.removeUser(socket.id);
    rooms = users.getRoomList(users);
    if(user){
      io.to(user.room).emit('UpdateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      io.emit('UpdateRoomList', rooms)


    }
  });

  
});



server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
