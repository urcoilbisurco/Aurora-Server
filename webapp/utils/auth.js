var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")

function build_url(url, token=null){
  let t=token || access_token
  return ("/api/v1"+url+"?access_token="+t)
}
module.exports={
  getUserState:(access_token)=>{
    return axios.get(build_url("/state", access_token)).then((response)=>{
      return response.data;
    })
  },
  login:function(data){
    return axios.post(build_url("/users/login"), data)
    .then(function(response){
      console.log("response", response.data);
      return response.data
    })
  },
  register:function(data){
    return axios.post(build_url("/users"), data)
    .then(function(response){
      console.log("response", response.data);
      return response.data
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
}
