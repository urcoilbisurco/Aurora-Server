var axios= require("axios");
var env=require("../_env");
var milano="45.4668,9.1905"
var url="http://promozioni-contest.it/test2/crossorigin.php?url=https://api.darksky.net/forecast/"+env.weather_token+"/"+milano+"/?units=si&exclude=minutely,hourly,daily,alerts,flags";

var helpers={
  login:function(){
    return axios.post(url)
    .then(function(response){
      console.log("response", response.data);
      return {
        temp:response.data.currently.temperature,
        descr:response.data.currently.summary,
      }
    }).catch(function(err){
      console.log("ERROR", err);
    });
  },
}
module.exports=helpers;
