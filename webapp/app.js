var React = require('react');
var ReactDOM = require('react-dom');
var Layout= require('./pages/layout');
var styles=require('./style.scss');
var storage=require("./utils/storage");


ReactDOM.render(<Layout/>, document.getElementById('app'));
