var db = require('../utils/db');
var mqtt = require("../utils/mqtt");
var uuid = require('uuid/v1');
var codes = require('voucher-code-generator');


var controller={
  getData:function(req, res){
    db.data.get({node: req.params.node}, {limit:10})
    .then(function(objs){
      res.json(objs)
    })
  },
  addData:function(req, res){
    data=req.body
    data.created_at=new Date();
    data.node=req.params.node
    db.data.addOne(data)
    .then(function(obj){
      res.json(obj)
    })
  },
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
      mqtt.publish(topic, JSON.stringify(doc.state))
    })
  },
  registerNode:function(req,res){
    db.nodes.register(req.params.code, req.params.type)
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
  }
}

module.exports = controller;
