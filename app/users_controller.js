var redis = require('../utils/redis.js');
var uuidV1 = require('uuid/v1');
var controller={
  getUser: function(req, res){
    //get Redis status for :name and return it
    store="users:"+req.params.uuid;
    redis.hgetall(store, function(err, obj){
      res.send({
        user:obj
      });
    });
  },
  createUser:function(req,res){
    uuid=uuidV1()
    data={
      "uuid":uuid,
      "info":{
        "name":req.body.name
      }
    }
    store="users:"+uuid;
    console.log(JSON.stringify(data))
    redis.hmset(store, data, function(err,result){
      redis.hgetall(store, function(err, obj){
        res.send({
          user:obj
        });
      });
    });

  },
}


module.exports = controller;
