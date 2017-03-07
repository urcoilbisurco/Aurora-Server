var express = require('express');
var bodyParser = require('body-parser');

var broker=require("./utils/broker");
var routes= require("./routes/routes");
var client=require("./utils/mqtt");
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use("/", routes);
app.set('port', (process.env.PORT || 3456));


app.listen(app.get("port"), function () {
  console.log('Ready on localhost:3456')
})
