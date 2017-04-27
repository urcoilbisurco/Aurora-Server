var db = require('../utils/db');
var mqtt = require("../utils/mqtt");
var scheduler= require("../utils/scheduler");
var socket= require("../utils/socket");
var uuid = require('uuid/v1');
var codes = require('voucher-code-generator');
var moment= require("moment")
var controller={
  getData:(req, res)=>{
    db.data.get({node: req.params.node}, {limit:10})
    .then((objs)=>{
      res.json(objs)
    })
  },
  addData:(req, res)=>{
    data=req.body
    data.created_at=new Date()
    data.node=req.params.node
    db.data.addOne(data)
    .then((obj)=>{
      res.json(obj)
    })
  },
  getStatusInfo: (req, res)=>{
    db.nodes.get(req.user.token, req.params.node)
    .then((obj)=>{
      res.json(obj)
    })
  },
  setStatusInfo:(req,res)=>{
    db.nodes.updateState(req.user, req.params.node, req.body)
    .then((doc)=>{
      res.json(doc);
      topic=doc.user+"/"+doc.uuid+"/update"
      console.log("publishing on...", topic)
      console.log("DOC", doc)
      mqtt.publish(topic, JSON.stringify(doc.state))
      socket.change_node(doc, req.user);
    })
  },
  addUser:(req,res)=>{
    db.nodes.addUser(req.user.token, req.params.node, req.body.email)
    .then((doc)=>{
      res.json(doc)
      socket.change_node(doc, req.user);
    })
  },
  removeUser:(req,res)=>{
    console.log(req.body)
    db.nodes.removeUser(req.user.token, req.params.node, req.body.email)
    .then((doc)=>{
      res.json(doc)
      socket.change_node(doc.value, req.user);
    })
  },
  setSchedule:(req,res)=>{
    var d=moment()
    d.add(req.body.when.value, req.body.when.unit)
    var schedule={
      uuid:uuid(),
      state:req.body.change,
      schedule:req.body.when,
      will_process_at:d.toDate()
    }
    db.nodes.addSchedule(req.user.token, req.params.node, schedule)
    .then((doc)=>{
      scheduler.add(schedule, req.params.node, req.user)
      res.json(schedule);
    })
  },
  removeSchedule:(req,res)=>{
    console.log("REQ params", req.params)
    db.nodes.removeSchedule(req.user.token, req.params.node, req.params.schedule)
    .then((doc)=>{
      res.json(doc);
    })
  },
  registerNode:(req,res)=>{
    db.nodes.register(req.params.code)
    .then((node)=>{
      res.json(node);
    })
  },
  generateNode:(req,res)=>{
    let code=codes.generate({
      length: 4,
      count: 1,
      charset: "0123456789"
    });
    let u=uuid();
    console.log("BODY", req.body)
    data={
      user:req.user.token,
      type:req.body.type,
      name:req.body.name,
      image:req.body.image,
      schedules:[],
      registered:false,
      uuid:u,
      code: code[0],
      state: req.body.state || {}
    }
    db.nodes.generate(data)
    .then((d)=>{
      return res.json(d);
    })
  },
  deleteNode:(req,res)=>{
    query={
      user:req.user.token,
      uuid:req.params.node,
    }
    db.nodes.del(query)
    .then((d)=>{
      return res.json(d);
    })
  }

}

module.exports = controller;
