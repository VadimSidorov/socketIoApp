var socket = io();

function scrollToBottom(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child')
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight()

  console.log(messages)

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight){
    messages.scrollTop(scrollHeight)

  }

}


socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html()
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html);
  scrollToBottom()
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html()
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
 
  jQuery('#messages').append(html);
  scrollToBottom();
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var textbox = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: textbox.val()
  }, function () {
    textbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if (!navigator.geolocation){
    return alert('Navigation not available')
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location ...')

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,

    })
  }, function(err){
    alert('Unable to fetch location');
    locationButton.removeAttr('disabled').text('Send Location');
  })
})