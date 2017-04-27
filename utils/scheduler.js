var db=require("./db.js");
var scheduler = require('node-schedule');
var mqtt = require("../utils/mqtt");
var socket= require("./socket");

module.exports={
  add:function(job, node, user){
    scheduler.scheduleJob(job.will_process_at, function(u, n, j){
      db.nodes.get(u.token, n).then(function(node){
        schedule=node.schedules.find(function(s){
          return s.uuid==j.uuid;
        })
        if(schedule){
          //if schedule still exists, update state!
          //TODO: doesn't works if the user is a collaborator!
          db.nodes.updateState(u, n, schedule.state)
          .then((doc)=>{
            console.log("STATE CHANGED!")
            topic=u.token+"/"+n+"/update"
            console.log("publishing on...", topic)
            mqtt.publish(topic, JSON.stringify(doc.state))
            db.nodes.removeSchedule(u.token, n, j.uuid).then(function(updated_node){
              console.log("updated node!", updated_node)
              socket.change_node(updated_node, u.token);
            })
          })
        }
      })
    }.bind(null, user, node, job));
  }
}
