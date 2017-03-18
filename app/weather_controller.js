var axios= require("axios");
var env=require("../_env");
var url="https://api.darksky.net/forecast/"+env.weather.token+"/"+env.weather.location+"/?units=si&exclude=minutely,hourly,daily,alerts,flags";


var controller={
  getWeather:(req, res)=>{
    return axios.get(url)
    .then(function(response){
      console.log("response", response.data);
      res.json({
        temp:response.data.currently.temperature,
        descr:response.data.currently.summary,
      })
    }).catch(function(err){
      res.json({
        temp:"---",
        descr:"---"
      })
      console.log("ERROR", err);
    });
  },
}

module.exports = controller;
