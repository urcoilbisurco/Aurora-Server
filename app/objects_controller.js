var db = require('../utils/db');
var mqtt = require("../utils/mqtt");
var uuid = require('uuid/v1');
var codes = require('voucher-code-generator');


var controller={
  getStatusInfo: function(req, res){
    db.nodes.get(req.user.token, req.params.node)
    .then(function(obj){
      res.json(obj)
    })
  },
  setStatusInfo:function(req,res){
    db.nodes.updateState(req.user.token, req.params.node, req.body)
    .then(function(doc){
      res.json(doc);
      topic=req.user.token+"/"+req.params.node+"/update"
      console.log("publishing on...", topic)
      mqtt.publish(topic, JSON.stringify(doc))
    })
  },
  registerNode:function(req,res){
    db
    .nodes.register(req.params.code)
    .then(function(node){
      res.json(node);
    })
  },
  generateNode:function(req,res){
    code=codes.generate({
      length: 4,
      count: 1,
      charset: "0123456789"
    });
    uuid=uuid()
    data={
      user:req.user.token,
      name:req.body.name,
      registered:false,
      uuid:uuid,
      code: code[0]
    }
    db.nodes.generate(data)
    .then(function(d){
      return res.json(d);
    })
    //find code and find associated User
    //associate name to this object, save info of this object like type (es: switch)
    //return user uuid & object name. This will be the mqtt url used from the node
  }
}

module.exports = controller;
