var mosca = require('mosca')
var env=require("../_env.js");

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: env.broker.mongo_url,
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: env.broker.port,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: env.broker.mongo_url
  }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}
