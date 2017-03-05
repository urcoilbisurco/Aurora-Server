var express = require('express');
var redis = require('redis');
var bodyParser = require('body-parser')


var routes= require("./routes/routes.js");

var app = express();
var client = redis.createClient();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use("/", routes);
app.set('port', (process.env.PORT || 3456));


app.listen(app.get("port"), function () {
  console.log('Ready on localhost:3456')
})
