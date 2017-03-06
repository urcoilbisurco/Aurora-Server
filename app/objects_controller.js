var db = require('../utils/db');

var controller={
  getStatusInfo: function(req, res){
    db.get(req.params.uuid, req.params.name, function(obj){
      res.send(obj)
    })
  },
  setStatusInfo:function(req,res){

    db.update(req.params.uuid, req.params.name, req.body, function(doc){
      console.log("Saved", doc);
    })
    res.send(req.body);
  },
}


module.exports = controller;
