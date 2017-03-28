var React = require('react');
var ReactRouter = require('react-router-dom');
import {
  BrowserRouter as Router,
  Route,
  IndexRoute
} from 'react-router-dom'
var Layout = require("/pages/layout");
var Home = require("/pages/home_page");
var Node = require("/pages/node/index.js");
var Auth = require("/pages/auth/index.js");
var Nodes = require("/pages/nodes");

var routes = (
  <Router>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/auth' component={Auth}/>
      <Route path='/nodes/:id' component={Node}/>
      <Route exact path='/nodes' component={Nodes}/>
    </div>
  </Router>
);

module.exports = routes;
