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
    db.scenes.create(data)
    .then(scene=> res.json(scene))
  },
  deleteScene:(req,res)=>{
    let data={
      user:req.user.token,
      scene:req.params.scene
    }
    db.scenes.del(data)
    .then(d => res.json(d))
  },
  editScene:(req,res)=>{
    //TODO
  },
  getScenes:(req,res)=>{
    //returns all scenes
  },
  triggerScene:(req,res)=>{
    db.scenes.edit({lastTriggered:new Date()})
    //get scene, then
    //for each scene.trigger, change the state.
  }
}

module.exports = controller;
