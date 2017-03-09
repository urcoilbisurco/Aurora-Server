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
    get: (id) => {
      return new Promise((resolve, reject) => {
        db.users.findOne({_id:ObjectId(id)},(err, doc) => {
          resolve(doc);
        });
      })
    },
    save:(data) => {
      return new Promise((resolve, reject) => {
        db.users.insert(data, (err,doc) => {
          console.log(doc.ops[0])
          resolve(doc.ops[0])
        })
      })
    },
  },
  nodes:{
    generate:(data, cb) => {
      return new Promise((resolve, reject) => {
        db.nodes.insert(data, (err,doc) => {
          resolve(doc.ops[0])
        })
      })
    },
    register:(id, code, values, cb) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOneAndUpdate(
          {code:code, user:id},
          {$set: {registered:true}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      });
    },
    updateState:(user, node, values) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOneAndUpdate(
          {_id:ObjectId(node), user:user},
          {$set:{state:values}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      })
    },
    query: (_query) => {
      return new Promise((resolve, reject) => {
        console.log(_query);
        db.nodes.find(_query, (err,obj) => {
          resolve(obj.toArray())
        })
      })
    },
    get:(user, node) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOne({_id:ObjectId(node), user:user}, (err,obj) => {
          console.log("obj", obj)
          resolve(obj)
        })
      })
    }
  }

}
