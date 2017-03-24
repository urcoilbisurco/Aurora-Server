var axios= require("axios");
var storage=require("./storage");
var access_token=storage.get("access_token")

function build_url(url, token=null){
  let t=token || access_token
  return ("/api/v1"+url+"?access_token="+t)
}
module.exports={
  createNode:(opts)=>{
    return axios.post(build_url("/nodes"), opts)
    .then((response)=>{
      return response.data;
    }).catch(function(err){
      console.log("ERROR", err);
      return err;
    });
  }

}
