var db = require('../utils/db');
var controller={
  getUser: function(req, res){
    db.findUser(req.params.uuid,function(err,user){
      res.send({
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
    db.save(data)
    res.send({
      user:data
    });
  },
}


module.exports = controller;
