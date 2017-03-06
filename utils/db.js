var mongojs = require('mongojs');
var mongo = mongojs('aurora').collection("users");
var ObjectId = require('mongodb').ObjectId;

var db={
  findUser:function(id, cb){
    mongo.find({_id:ObjectId(id)},cb)
  },
  saveUser:function(data, cb){
    mongo.save(data, cb)
  },
  update:function(id, key, values, cb){
    data={}
    data[key]=values
    console.log("UPDATE", values)
    mongo.findAndModify({
      query:{_id:ObjectId(id)},
      update:{$set: data},
      new:true,
    }, function(err, doc, lastErrorObject) {
      console.log("DOC", doc)
      if(cb){cb(doc[key])}
    });
  },

  get:function(id, key, cb){
    mongo.findOne({_id:ObjectId(id)}, function(err,obj){
      console.log(obj)
      if(cb){cb(obj[key])}
    })
  }

}


module.exports=db;
