var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.on('showMes',(res)=>{
      console.log(res)
  })
  
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

