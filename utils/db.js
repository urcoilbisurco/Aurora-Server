var mongojs = require('mongojs');
var mongo = require('mongodb').MongoClient;
var env=require("../_env.js");
var ObjectId = require('mongodb').ObjectID;
var db;
mongo.connect(env.mongo, function(err, _db) {
  db=_db;
  db.users= db.collection("users");
  db.nodes = db.collection("nodes");
  db.data = db.collection("data");
});

module.exports={
  users:{
    query: (_query, opts) => {
      return new Promise((resolve, reject) => {
        q= opts.one ? "findOne" : "find"
        db.users[q](_query, (err,obj) => {
          resolve(obj)
        })
      })
    },
    get: (uuid) => {
      return new Promise((resolve, reject) => {
        db.users.findOne({token:uuid},(err, doc) => {
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
  data:{
    addOne:(data)=>{
      return new Promise((resolve, reject) =>{
        db.data.insert(data, (err,doc)=>{
          resolve(doc.ops[0])
        })
      })
    },
    get:(_query, opts={})=>{
      return new Promise((resolve, reject) =>{
        db.nodes.find(_query, {}, opts, (err,obj) => {
          resolve(obj.toArray())
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
    register:(code, type) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOneAndUpdate(
          {code:code},
          {$set: {registered:true, type:type}},
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
        db.nodes.find(_query, (err,obj) => {
          resolve(obj.toArray())
        })
      })
    },
    get:(user, node) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOne({_id:ObjectId(node), user:user}, (err,obj) => {
          resolve(obj)
        })
      })
    }
  }

}
