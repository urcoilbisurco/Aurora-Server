var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Layout = require("../pages/layout");
var HomePage = require("../pages/home_page");
var Auth = require("../pages/auth");

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePage}/>
      <Route path='/auth' component={Auth}/>
    </Route>
  </Router>
);

module.exports = routes;
