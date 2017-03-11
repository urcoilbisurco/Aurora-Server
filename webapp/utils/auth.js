var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")

function build_url(url){
  return ("/api/v1/"+url+"?access_token="+access_token)
}
module.exports={
  getUserState:(access_token)=>{
    return axios.get(build_url("state")).then((response)=>{
      return response.data;
    })
  },
  login:function(data){
    return axios.post("/users/login", data)
    .then(function(response){
      console.log("response", response.data);
      return response.data
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  register:function(data){
    return axios.post("/users", data)
    .then(function(response){
      console.log("response", response.data);
      return response.data
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
}
