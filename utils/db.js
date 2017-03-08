var mongojs = require('mongojs');
var mongo = require('mongodb').MongoClient
var env=require("../_env.js");

var db;
mongo.connect(env.mongo, function(err, _db) {
  console.log("Connected successfully to mongodb");
  db=_db;
  db.users= db.collection("users");
  db.nodes = db.collection("nodes");
});
var ObjectId = require('mongodb').ObjectId;

module.exports={
  users:{
    get:function(id){
      return new Promise(function(resolve, reject){
        db.users.findOne({_id:ObjectId(id)},function(err, doc){
          resolve(doc);
        });
      })
    },
    save:function(data){
      return new Promise(function(resolve, reject){
        db.users.insert(data, function(err,doc){
          console.log(doc.ops[0])
          resolve(doc.ops[0])
        })
      })
    },
  },
  nodes:{
    generate:function(data, cb){
      return new Promise(function(resolve, reject){
        db.nodes.insert(data, function(err,doc){
          resolve(doc.ops[0])
        })
      })
    },
    register:function(id, code, values, cb){
      return new Promise(function(resolve, reject){
        db.nodes.findOneAndUpdate(
          {code:code, user:id},
          {$set: {registered:true}},
          function(err, doc) {
            resolve(doc.value)
          }
        );
      });
    },
    updateState:function(user, node, values){
      return new Promise(function(resolve, reject){
        db.nodes.findOneAndUpdate(
          {_id:ObjectId(node), user:user},
          {$set:{state:values}},
          function(err, doc) {
            resolve(doc.value)
          }
        );
      })
    },
    get:function(user, node){
      return new Promise(function(resolve, reject){
        db.nodes.findOne({_id:ObjectId(node), user:user}, function(err,obj){
          console.log("obj", obj)
          resolve(obj)
        })
      })
    }
  }

}
