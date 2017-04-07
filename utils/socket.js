var socket = require('socket.io-client')('http://localhost:3457');
socket.on('connect', function(){
  console.log("connected to server.")
});

module.exports={
  change_node:function(node, current_user){
    //node.users.forEach(function(user){
      //if(user.uuid!=current_user){
      console.log("published")
      socket.emit("push", {channel:"users/"+node.user, event:"state_update", message:{
        type:"SOCKET_CHANGE_NODE",
        node:node.uuid,
        payload:node
      }})
      //}
    //})
  }
}
