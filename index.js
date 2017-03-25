var express = require('express');
var bodyParser = require('body-parser');
var passport=require("passport");
var morgan  = require('morgan')
var path=require("path");
var compression  = require('compression')
var fs = require('fs');

var env=require("./_env");
var broker=require("./utils/broker");
var routes= require("./routes/routes");
var https = require('https');
var http = require('http');
var client=require("./utils/mqtt");
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use("/", routes);
app.use(passport.initialize());
app.use(morgan('dev'))


if (!env.production) {
  app.set('port', (env.port || 3456));
  app.listen(app.get("port"),  () => {
    console.log('Ready on localhost:3456')
  })
  //For React App in /webapp
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.devAssetsPath,
    contentBase: 'webapp',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(__dirname + '/webapp/dist'));
  app.get('*', function response(req, res, next) {
    if (req.xhr) { return next();}
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'webapp/dist/index.html')));
    res.end();
  });
} else {
  //SETUP HTTPS
  http.createServer(app).listen(env.port);
  https.createServer({
    key: fs.readFileSync(env.https_cert_folder+"privkey.pem"),
    cert: fs.readFileSync(env.https_cert_folder+"fullchain.pem"),
    ca: fs.readFileSync(env.https_cert_folder+"chain.pem")
  }, app).listen(443);

  app.use(compression());
  app.use(express.static(__dirname + '/webapp/dist'));
  app.get('*', function response(req, res, next) {
    if (req.xhr) { return next();}
    res.sendFile(path.join(__dirname, 'webapp/dist/index.html'));
  });
}
