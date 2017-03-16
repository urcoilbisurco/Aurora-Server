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
  var uuid=topic.split("/")[0]
  var node=topic.split("/")[1]
  db.update(uuid, node, message);
}


module.exports=client;
