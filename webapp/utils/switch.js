var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")

function build_url(url){
  return ("/api/v1"+url+"?access_token="+access_token)
}

module.exports={
  getStatus:function(node){
    return axios.get(build_url("/nodes/"+node))
    .then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  setStatus:function(node, data){
    return axios.post(build_url("/nodes/"+node), data)
    .then(function(info){
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  addSchedule:function(node, data){
    return axios.post(build_url("/nodes/"+node+"/schedule"), data)
    .then(function(info){
      console.log(info)
      return info.data
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  removeSchedule:function(node, schedule){
    return axios.delete(build_url("/nodes/"+node+"/schedule/"+schedule))
    .then(function(info){
      console.log(info)
      return info.data
    }).catch(function(err){
      console.log("ERROR", err);
    });
  }
}
