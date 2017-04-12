var env=require("../_env.js");
var socket = require('socket.io-client')(env.socket_server);
socket.on('connect', function(){
  console.log("connected to server.")
});

module.exports={
  change_node:function(node, current_user){
    let users=node.users
    users.push(node.user)
    users.forEach(function(user){
      console.log("published for user "+ user)
      socket.emit("push", {channel:"users/"+user, event:"state_update", message:{
        type:"SOCKET_CHANGE_NODE",
        node:node.uuid,
        payload:node
      }})
    })
  }
}
