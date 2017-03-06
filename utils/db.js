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
    mongo.findAndModify({
      query:{_id:ObjectId(id)},
      update:{$set: data},
    }, function(err, doc, lastErrorObject) {
      if(cb){cb(doc)}
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
