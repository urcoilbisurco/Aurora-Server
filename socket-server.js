var port=3457;
var io = require('socket.io')();
io.on('connection', function(client){
  console.log("CLIENT", client)
  client.on('subscribe', function(data) {
    console.log("somebody subscribed!")
        if (data!=null && data.channel!=null && data.channel!=="") {
            client.join(data.channel);
        }
    });
  // remove the user from a room (or channel)
  client.on('unsubscribe', function(data) {
      if (data!=null && data.channel!=null && data.channel!=="") {
          client.leave(data.channel);
      }
  })
  // the user pushes data to the channel
  client.on('push', function(data) {
    console.log("PUSH!", data)
      if (data!=null && data.channel!=null && data.channel!==""
       && data.event!=null && data.event!==""
       && data.message!=null && data.message!=="") {
         console.log("pushing...")
          io.sockets.to(data.channel).emit(data.event, data);
      }
  });
});
io.listen(port);
console.log("started socket server on port "+ port);
