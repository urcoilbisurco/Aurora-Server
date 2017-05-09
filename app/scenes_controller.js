var db = require('../utils/db');
var mqtt = require("../utils/mqtt");
var scheduler= require("../utils/scheduler");
var socket= require("../utils/socket");
var uuid = require('uuid/v1');
var moment= require("moment")
var controller={
  createScene:(req,res)=>{
    let data={
      user:req.user.token,
      name:req.body.name,
      triggers:req.body.triggers,
      image:req.body.image,
      uuid:uuid(),
      lastTriggered:undefined
    }
    console.log(db.scenes)
    db.scenes.create(data)
    .then(scene=> res.json(scene))
  },
  deleteScene:(req,res)=>{
    let data={
      user:req.user.token,
      uuid:req.params.scene
    }
    db.scenes.del(data)
    .then(d => res.json(d))
  },
  editScene:(req,res)=>{
    //TODO
  },
  getScenes:(req,res)=>{
    //returns all scenes
    db.scenes.query(req.user.token)
    .then(scenes=> res.json(scenes))
  },
  triggerScene:(req,res)=>{
    db.scenes.edit({user:req.user.token, uuid:req.params.scene}, {lastTriggered:new Date()})
    .then(scene => {
      scene.triggers.forEach(t =>{
        //TODO: refactor this. it's the same as objects_controller.setStatusInfo.
        db.nodes.updateState(req.user, t.uuid, t.state)
        .then((doc)=>{
          mqtt.publish(doc.user+"/"+doc.uuid+"/update", JSON.stringify(doc.state))
          socket.change_node(doc);
        })
      });
      res.json(scene)
    })
    //get scene, then
    //for each scene.trigger, change the state.
  }
}

module.exports = controller;
