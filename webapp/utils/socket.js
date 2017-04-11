var store=require("store.js");
var env=require("../../_env.js")
var pusher = {
    io: null,
    init: function () {
    console.log("initializing");
        pusher.io = require('socket.io-client')(env.socket_server);
    },
    subscribe: function(channel) {
        pusher.io.emit('subscribe', {channel:channel});
        return this;
    },
    bind: function(name, func) {
        pusher.io.on(name, func);
    },
    publish: function(data) {
        pusher.io.emit('push', {event:data["event"], message:data["message"], channel:data["channel"]});
    }
};

if(store.getState().user && store.getState().user.token){
  pusher.init();
  console.log(store.getState());
  var channel = pusher.subscribe('users/'+store.getState().user.token);

  channel.bind('state_update', function(data) {
    console.log("i've received an event!", data.message);
    store.dispatch(data.message)
    console.log("i've received an event!", data.message);
  });
}
