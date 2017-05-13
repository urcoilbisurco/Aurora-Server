import React from 'react';
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

import New from "/pages/new/new_page";
import Scenes from "/pages/scenes/";

//simple utility component to handle scrollToTop when a URL changes
import { withRouter } from 'react-router'

const ScrollComponent = React.createClass({
  componentDidUpdate:function(prevProps){
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  },
  render:function(){
    return this.props.children
  }
})
const ScrollToTop=withRouter(ScrollComponent);


var routes = (
  <Router>
     <ScrollToTop>
       <div>
      <Route exact path='/' component={Home}/>
      <Route path='/auth' component={Auth}/>
      <Route path='/new' component={New}/>
      <Route path='/scenes' component={Scenes}/>
      <Route exact path='/nodes/:node' component={Node}/>
      <Route exact path='/nodes/:node/users' component={Users}/>
      <Route exact path='/nodes' component={Nodes}/>
      </div>
  </ScrollToTop>
  </Router>
);

module.exports = routes;
