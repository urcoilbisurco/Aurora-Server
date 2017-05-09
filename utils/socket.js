var env=require("../_env.js");
var socket = require('socket.io-client')(env.socket_server);
var db = require('../utils/db');
socket.on('connect', function(){
  console.log("connected to server.")
});

module.exports={
  change_node:function(node, current_user){
    let get_users_names=node.users.map(u => {
      console.log("U", u)
      return db.users.query({email:u}, {one:true})
    })
    console.log("NODE", node)
    get_users_names.push(db.users.query({uuid:node.user}, {one:true}))
    console.log("GET USER NAMES", get_users_names);
    Promise.all(get_users_names).then(users => {
      console.log("USERS", users)
      users.forEach(function(user){
        //console.log("published for user "+ user)
        console.log("USER", user);
        socket.emit("push", {channel:"users/"+user.token, event:"state_update", message:{
          type:"SOCKET_CHANGE_NODE",
          node:node.uuid,
          payload:node
        }})
      })
    });
  }
}
