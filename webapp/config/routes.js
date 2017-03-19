var React = require('react');
var ReactRouter = require('react-router-dom');
import {
  BrowserRouter as Router,
  Route,
  IndexRoute
} from 'react-router-dom'
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var hashHistory = ReactRouter.hashHistory;
// var IndexRoute = ReactRouter.IndexRoute;
var Layout = require("../pages/layout");
var Home = require("../pages/home_page");
var Auth = require("../pages/auth/index.js");
var Nodes = require("../pages/nodes");
var routes = (
  <Router>
    <div>
      <Route exact path='/' component={Home}/>
      <Route path='/auth' component={Auth}/>
      <Route path='/nodes' component={Nodes}/>
    </div>
  </Router>
);

module.exports = routes;
