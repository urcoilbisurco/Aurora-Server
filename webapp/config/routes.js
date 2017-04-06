var React = require('react');
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
var Users = require("/pages/node/users/index.js");

var routes = (
  <Router>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/auth' component={Auth}/>
      <Route exact path='/nodes/:node' component={Node}/>
      <Route exact path='/nodes/:node/users' component={Users}/>
      <Route exact path='/nodes' component={Nodes}/>
    </div>
  </Router>
);

module.exports = routes;
