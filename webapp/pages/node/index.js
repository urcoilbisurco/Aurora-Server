var React = require('react');
var css=require("./nodes.scss");
var nodes_utils= require("utils/nodes");
var Container=require("components/UI/page_container/index");
var utils=require("utils/switch");
var cn=require("classnames");
var SchedulerContainer = require('components/_nodes/schedule/schedules.js');
var UsersContainer = require('components/_nodes/users/users.js');
var Button=require("components/UI/button/button");
var NodeInfo=require("components/_nodes/node_info/node_info");

var NodeControls=require("components/_nodes/node_control/node_control");

import { connect } from 'react-redux';
import store from 'store';

const NodePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  getDefaultProps:function(){
    return {
      schedules:[],
      users:[],
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
  onChange:function(change){
    store.dispatch({
      type: 'SET_STATUS',
      node:this.props.uuid,
      state:change
    })
    utils.setStatus(this.props.uuid, Object.assign({}, this.props.state, change))//{...this.props.state, change})
  },
  render:function() {
    return (
      <Container animate={!this.state.rendered} icon="back" background={this.props.image}>
        <div className={css.container}>
          <NodeInfo node={this.props}/>
          <NodeControls node={this.props} onChange={this.onChange} />
          <SchedulerContainer label={(!this.props.state.open ? "on" : "off")} state={this.props.state} node={this.props.uuid} schedules={this.props.schedules} />
        <div className={cn(css.subtitle, css.more_info)}>Info</div>
          <div className={css.info}>Code: <b>{this.props.code}</b></div>
          <div className={css.info}>This node {this.props.registered ? "is registered." : "isn't registered yet."}</div>
          {this.props.owner &&
          <Button to={"/nodes/"+this.props.uuid+"/users"} type="link">Manage users</Button>
          }
      </div>
      </Container>
    );
  },
});

const mapStateToProps = function(state, opts) {
  let node_state=state.nodes.find(function(n){return n.uuid==opts.match.params.node})
  console.log(node_state.schedules)
  return {...node_state};
}

module.exports=connect(mapStateToProps)(NodePage);
