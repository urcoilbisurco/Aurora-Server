var mqtt = require('mqtt');
var db = require('../utils/db');
var env=require("../_env.js");
var client  = mqtt.connect(env.mqtt_server);

client.on("connect", ()=>{
  client.subscribe("+/+/updated")
});

client.on("message", (topic,message)=>{
  if(topic.includes("updated")){
    update(topic, message.toString());
  }
});

function update(topic, message){
  console.log("TOPIC:", topic)
  console.log("MESSAGE:",message)
  var user=topic.split("/")[0]
  var node=topic.split("/")[1]
  db.nodes.updateState(user, node, JSON.parse(message));
}


module.exports=client;
