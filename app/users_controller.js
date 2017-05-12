var db = require('../utils/db');
var env= require("../_env.js");
var bcrypt = require('bcrypt');
var uuid = require('uuid/v1');
const saltRounds = env.auth.saltRounds;

var utils={
  clean: (obj)=>{
    delete obj["password"]
    return obj
  }
}
var controller={
  login:(req, res)=>{
    db.users
    .query({email:req.body.email}, {one:true})
    .then( (existingUser) => {
      if(!existingUser){
        return res.json(400, {error:"Can't find user with this email."})
      }
      user=existingUser
      bcrypt
      .compare(req.body.password, user.password)
      .then( (compare_result) => {
        if(compare_result){
          return res.json({
            user:utils.clean(user)
          })
        }else{
          return res.status(400).json({error:"Wrong Password."})
        }
      });
    })
  },
  getUser: (req, res) => {
    Promise.all([
      db.nodes
      //.query({user: req.user.token})
      .query({
        $or: [
          {user: req.user.token},
          {users: {$in:[req.user.email]}}
        ]
      }),
      db.scenes.query({user:req.user.token})
    ])
    .then( children => {
      user=req.user;
      let nodes=children[0];
      user.scenes=children[1];
      user.nodes=nodes.map((node)=>{
        return Object.assign({}, node, {owner: node.user==req.user.token})
      })
      res.json(utils.clean(user))
    })
  },
  createUser: (req,res) => {
    db.users
    .query({email:req.body.email}, {one:true})
    .then( (existingUser)=> {
      if(existingUser){
        return res.json(400, {error:"user already exists with this email."})
      }
      bcrypt
      .hash(req.body.password, saltRounds)
      .then( (hash) => {
        // Store hash in your password DB.
        data={
          "info":{
            "name":req.body.name,
          },
          "token":uuid(),
          "email":req.body.email,
          "password":hash
        }
        db.users
        .save(data)
        .then( user=>{
          res.json({
            user:user
          });
        })
      });
    });
  },
}


module.exports = controller;
