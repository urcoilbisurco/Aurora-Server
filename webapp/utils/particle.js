var axios= require("axios");
var env=require("../_env");

var device=env.device
var token=env.token
var params="?access_token="+token

function getValue(key){
  return axios.get("https://api.particle.io/v1/devices/"+device+"/"+key+params);
}
function postValue(key, data){
  return axios.post("https://api.particle.io/v1/devices/"+device+"/"+key+params, data);
}

var helpers={
  getStatus:function(name){
    return getValue(name+"_status")
    .then(function(response){
      console.log(response.data)
      return response.data.result;
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  setStatus:function(name, data){
    postValue(name, data)
    .then(function(info){
    }).catch(function(err){
      console.log("ERROR", err);
    });
  }
}
module.exports=helpers;
