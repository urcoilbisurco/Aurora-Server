var express = require('express');
var bodyParser = require('body-parser');
var passport=require("passport");

var env=require("./_env");
var broker=require("./utils/broker");
var routes= require("./routes/routes");
var client=require("./utils/mqtt");
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use("/", routes);
app.set('port', (env.port || 3456));
app.use(passport.initialize());

app.listen(app.get("port"),  () => {
  console.log('Ready on localhost:3456')
})
