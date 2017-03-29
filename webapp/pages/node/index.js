var React = require('react');
var Redirect = require('react-router').Redirect;
var css=require("./nodes.scss");
var nodes_utils= require("utils/nodes");
var Container=require("components/UI/page_container/index");
var Switch= require('components/switch/switch');
var Button= require('components/UI/button/button');
import {MdClose} from 'react-icons/lib/md';
var utils=require("utils/switch");
var cn=require("classnames");
var RoundImage=require("components/UI/round_image/round_image");

import { connect } from 'react-redux';
import store from 'store';
import {Select} from "components/UI/select/select"
import {notify} from 'react-notify-toast';
const Schedule=React.createClass({
  onClick:function(){
    utils.removeSchedule(this.props.node, this.props.schedule.uuid).then(function(schedule){
      console.log("SCHEDULE", schedule)
      // store.dispatch({
      //   type: 'REMOVE_SCHEDULE',
      //   schedule:this.props.schedule.uuid
      // })
    }.bind(this))
  },
  render:function(){
    return <div className={css.schedule}>
            Will turn {this.props.schedule.state.open ? "ON" : "OFF"} in {this.props.schedule.schedule.value} {this.props.schedule.schedule.unit}
            <span className={css.delete}><MdClose></MdClose></span>
           </div>
  }
})
const NodePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  getDefaultProps:function(){
    return {
      schedules:[]
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
  handleSchedule:function(){
    let change={open:!this.props.state.open}
    let when={unit:"minutes", value:this.timer_select.value()}
    utils.addSchedule(this.props.uuid, {change:change, when:when}).then(function(schedule){
      console.log("SCHEDULE", schedule)
      store.dispatch({
        type: 'SET_SCHEDULE',
        node:this.props.uuid,
        schedule:schedule
      })
    }.bind(this))
  },
  render:function() {
    let label=(this.props.state.open ? "on" : "off");
    let alt_label=(!this.props.state.open ? "on" : "off");
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
          <div className={css.schedules_container}>
            { this.props.schedules.map(function(s){
                return <Schedule node={this.props.node} key={s.uuid} schedule={s}></Schedule>
              }.bind(this))
            }
          </div>
          <div className={cn(css.subtitle, css.timer_title)}>Turn {alt_label} in</div>
          <Select label="" ref={(ref)=>this.timer_select=ref} />
          <Button type="round" onClick={this.handleSchedule}>Schedule</Button>
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
