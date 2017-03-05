var express = require('express');
var router = express.Router();

router.route("/api/v1/:uuid/:name/")
  .get(function(req, res){
    //get Redis status for :name and return it
    res.send({
      uuid:req.params.uuid,
      name:req.params.name,
    })
  })
  .post(function(req, res){
    console.log(req.body);
    //save in Redis (":uuid/:name", req.body)
    res.send({
      uuid:req.params.uuid,
      name:req.params.name,
      body:req.body,
    })
  })

router.get('/', function (req, res) {
  //ready, return the React app
  res.send("React App with data")
})

module.exports = router;
