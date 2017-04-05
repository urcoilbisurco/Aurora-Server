var React = require('react');
var Redirect = require('react-router').Redirect;
var css=require("./nodes.scss");
var nodes_utils= require("utils/nodes");
var Container=require("components/UI/page_container/index");
var Switch= require('components/switch/switch');
var Button= require('components/UI/button/button');
var utils=require("utils/switch");
var cn=require("classnames");
var SchedulerContainer = require('components/schedule/schedules.js');
var RoundImage=require("components/UI/round_image/round_image");

import { connect } from 'react-redux';
import store from 'store';
import {notify} from 'react-notify-toast';

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
      <Container animate={!this.state.rendered} icon="back" background={this.props.image}>
        <div className={css.container}>
          <RoundImage src={this.props.image} />

          <h3 className={css.title}>{this.props.name}</h3>
          <div className={css.subtitle}>Currently {this.props.name} is {label}</div>
          <div className={css.switch_container}>
            <Switch className={ css.switch } open={this.props.state.open} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
          </div>
          <SchedulerContainer label={(!this.props.state.open ? "on" : "off")} state={this.props.state} node={this.props.uuid} schedules={this.props.schedules} />
          { this.props.users.length>0 &&
            <div className={css.users_container}>
              { this.props.users.map(function(s){
                  return <Schedule node={this.props.uuid} key={s.uuid} schedule={s}></Schedule>
                }.bind(this))
              }
            </div>
          }

          <div className={cn(css.subtitle, css.more_info)}>Info</div>
          <div className={css.info}>Code: <b>{this.props.code}</b></div>
          <div className={css.info}>This node {this.props.registered ? "is registered." : "isn't registered yet."}</div>
        </div>
      </Container>
    );
  },
});

const mapStateToProps = function(state, opts) {
  let node=opts.location.pathname.split("/").pop();
  let node_state=state.nodes.find(function(n){return n.uuid==node})
  console.log(node_state.schedules)
  return {...node_state};
}

module.exports=connect(mapStateToProps)(NodePage);
