
var socket = io();

socket.on('UpdateRoomList', function(rooms){
  console.log(rooms)
  var div = jQuery('<div></div>');
  var element = jQuery('.dropdown-child');
  rooms.forEach(function (room) {
    div.append(jQuery('<a></a>').text(room))
  });
  element.html(div)

  var roomLink = jQuery('a')
  roomLink.click(function(){
    var input = jQuery('#room').val(this.innerHTML)
    console.log(this.innerHTML)
  })
})




