var React = require('react');
var ReactDOM = require('react-dom');
var routes= require('./config/routes');
var styles=require('./style.scss');
var storage=require("./utils/storage");


ReactDOM.render(routes, document.getElementById('app'));
