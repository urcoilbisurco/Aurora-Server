let mongojs = require('mongojs');
let mongo = require('mongodb').MongoClient;
let env=require("../_env.js");
let db;

mongo.connect(env.mongo, function(err, _db) {
  db=_db;
  db.users= db.collection("users");
  db.nodes = db.collection("nodes");
  db.data = db.collection("data");
  db.scenes = db.collection("scenes");
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
        opts.sort=[["created_at","desc"]]
        db.data.find(_query, {}, opts, (err,obj) => {
          resolve(obj.toArray())
        })
      })
    },
  },
  scenes:{
    del:(_query)=>{
      return new Promise((resolve, reject) => {
        db.scenes.remove(_query, (err, doc)=>{
          resolve(doc)
        })
      });
    },
    create:(data)=>{
      return new Promise((resolve, reject) => {
        db.scenes.insert(data, (err,doc) => {
          resolve(doc.ops[0])
        })
      });
    },
    query: (_query) => {
      return new Promise((resolve, reject) => {
        db.scenes.find(_query, (err,obj) => {
          resolve(obj.toArray())
        })
      })
    },
    get:(user, scene) => {
      return new Promise((resolve, reject) => {
        db.scenes.findOne({uuid:scene, user:user}, (err,obj) => {
          resolve(obj)
        })
      })
    },
    edit:(query, data) =>{
      return new Promise((resolve, reject) => {
        db.scenes.findOneAndUpdate(
          query,
          {$set: data},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      });
    }
  },
  nodes:{
    generate:(data, cb) => {
      return new Promise((resolve, reject) => {
        db.nodes.insert(data, (err,doc) => {
          resolve(doc.ops[0])
        })
      })
    },
    del:(_query)=>{
      return new Promise((resolve, reject) => {
        db.nodes.remove(_query, (err, doc)=>{
          resolve(doc)
        })
      });
    },
    register:(code) => {
      return new Promise((resolve, reject) => {
        db.nodes.findOneAndUpdate(
          {code:code},
          {$set: {registered:true}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      });
    },
    updateState:(user, node, values) => {
      let elements=Object.keys(values).reduce((all, k)=>{
        all["state."+k]=values[k]
        return all;
      }, {})
      return new Promise((resolve, reject) => {
        db.nodes.findOneAndUpdate({
          $and:[
            {uuid:node},
            {$or: [
              {user: user.token},
              {users: {$in:[user.email]}}
            ]}
          ]},
          {$set:elements},
          {returnOriginal:false},
          (err, doc) =>  {
            console.log("ERROR", err);
            console.log("DOC UPDATE", doc);
            resolve(doc.value)
          }
        );
      })
    },
    addUser:(user,node,collab_user)=>{
      console.log("COLLAB_USER", collab_user)
      return new Promise((resolve, reject)=>{
        db.nodes.findOneAndUpdate(
          {uuid:node, user:user},
          {$push:{users:collab_user}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      })
    },
    addSchedule:(user,node, schedule)=>{
      console.log({uuid:node, user:user})
      return new Promise((resolve, reject)=>{
        db.nodes.findOneAndUpdate(
          {$and:[
            {uuid:node},
            {$or: [
              {user: user},
              {users: {$in:[user]}}
            ]}
          ]},
          {$push:{schedules:schedule}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      })
    },
    removeUser:(user,node,collab_email)=>{
      console.log("collab_email", collab_email)
      return new Promise((resolve, reject)=>{
        db.nodes.findOneAndUpdate(
          {uuid:node, user:user},
          {$pull:{users:collab_email}},
          {returnOriginal:false},
          (err, doc) =>  {
            resolve(doc.value)
          }
        );
      })
    },
    removeSchedule:(user,node,schedule)=>{
      console.log({uuid:node, user:user, schedule:schedule})
      return new Promise((resolve, reject)=>{
        db.nodes.findOneAndUpdate(
          {$and:[
            {uuid:node},
            {$or: [
              {user: user},
              {users: {$in:[user]}}
            ]}
          ]},
          {$pull:{schedules:{uuid:schedule}}},
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
        db.nodes.findOne({uuid:node, user:user}, (err,obj) => {
          resolve(obj)
        })
      })
    }
  }

}
