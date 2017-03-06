var redis = require('../utils/redis');

var controller={
  getStatusInfo: function(req, res){
    //get Redis status for :name and return it
    store="users:"+req.params.uuid;
    redis.hget(store, req.params.name, function(err, obj){
      console.log(obj)
      res.send(obj);
    });
  },
  setStatusInfo:function(req,res){
    store="users:"+req.params.uuid;
    body={}
    body[req.params.name]=req.body;
    redis.hset(store, body, function(err,result){
      redis.hgetall(store, req.params.name,  function(err, obj){
        res.send(obj);
      });
    });

    res.send({
      uuid:req.params.uuid,
      name:req.params.name,
      body:req.body,
    })
  },
}


module.exports = controller;
