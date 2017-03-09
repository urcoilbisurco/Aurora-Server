var db = require('../utils/db');
var controller={
  getUser: (req, res) => {
    Promise.all([db.users.get(req.params.uuid), db.nodes.query({user:req.params.uuid})])
    .then( data => {
      console.log("????", data)
      user=data[0]
      nodes=data[1]
      user.nodes=nodes
      res.json({
        user:user
      })
    })
  },
  createUser: (req,res) => {
    data={
      "info":{
        "name":req.body.name
      }
    }
    db.users
    .save(data)
    .then( user=>{
      res.json({
        user:user
      });
    })
  },
}


module.exports = controller;
