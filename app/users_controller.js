var db = require('../utils/db');
var controller={
  getUser: function(req, res){
    db.users
    .findUser(req.params.uuid)
    .then(function(user){
      res.json({
        user:user
      })
    })
  },
  createUser:function(req,res){
    data={
      "info":{
        "name":req.body.name
      }
    }
    db.users
    .saveUser(data)
    .then(function(user){
      res.json({
        user:user
      });
    })
  },
}


module.exports = controller;
