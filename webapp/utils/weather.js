var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")
var url="/api/v1/weather";

function build_url(url, token=null){
  let t=token || access_token
  return ("/api/v1"+url+"?access_token="+t)
}

var helpers={
  getWeather:function(){
    return axios.get(build_url("/weather"))
  },
}
module.exports=helpers;
