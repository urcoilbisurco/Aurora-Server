var React = require('react');
//var css=require("./nodes.scss");
var nodes_utils= require("utils/nodes");
var Container=require("components/UI/page_container/index");
var Switch= require('components/switch/switch');
var utils=require("utils/switch");
var cn=require("classnames");
var UsersContainer = require('components/_nodes/users/users.js');
var RoundImage=require("components/UI/round_image/round_image");
var Button=require("components/UI/button/button");
var NodeInfo=require("components/_nodes/node_info/node_info.js");

import { connect } from 'react-redux';
import store from 'store';

const UsersPage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  getDefaultProps:function(){
    return {
      users:["test@test.com"],
    }
  },
  getInitialState:function(){
    return {
      rendered:false,
    }
  },
  componentDidMount:function(){
    this.setState({rendered:true})
  },
  onChange:function(what){
    let change={open: !this.props.state.open}
    store.dispatch({
      type: 'SET_STATUS',
      node:this.props.uuid,
      state:change
    })
    utils.setStatus(this.props.uuid, change)
  },

  render:function() {
    let label=(this.props.state.open ? "on" : "off");
    console.log("PROPS", this.props.schedules)
    return (
      <Container animate={false} back={"/nodes/"+this.props.uuid} animate={!this.state.rendered} icon="back" background={this.props.image}>
        <span>
          <NodeInfo node={this.props}/>
          <UsersContainer node={this.props.uuid} users={this.props.users}/>
        </span>
    </Container>
    );
  },
});

const mapStateToProps = function(state, opts) {
  let node_state=state.nodes.find(function(n){return n.uuid==opts.match.params.node})
  return {...node_state};
}

module.exports=connect(mapStateToProps)(UsersPage);
