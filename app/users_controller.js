var db = require('../utils/db');
var controller={
  getUser: function(req, res){
    db.findUser(req.params.uuid,function(err,user){
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
    db.saveUser(data)
    res.json({
      user:data
    });
  },
}


module.exports = controller;
