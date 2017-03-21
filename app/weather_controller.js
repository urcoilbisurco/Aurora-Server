var axios= require("axios");
var env=require("../_env");
var url="https://api.darksky.net/forecast/"+env.weather.token+"/"+env.weather.location+"/?units=si&exclude=minutely,hourly,daily,alerts,flags";


var controller={
  getWeather:(req, res)=>{
    return axios.get(url)
    .then(function(response){
      res.json({
        temp:response.data.currently.temperature,
        descr:response.data.currently.summary,
      })
    }).catch(function(err){
      console.log("ERROR", err);
      res.json({
        temp:"---",
        descr:"---"
      })
    });
  },
}

module.exports = controller;
