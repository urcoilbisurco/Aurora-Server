var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")

function build_url(url){
  return ("/api/v1"+url+"?access_token="+access_token)
}

function getValue(node){
  return axios.get(build_url("/nodes/"+node));
}
function postValue(node, data){
  return axios.post(build_url("/nodes/"+node), data);
}

module.exports={
  getStatus:function(node){
    return getValue(node)
    .then(function(response){
      return response.data;
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
  setStatus:function(node, data){
    postValue(node, data)
    .then(function(info){
    }).catch(function(err){
      console.log("ERROR", err);
    });
  }
}
