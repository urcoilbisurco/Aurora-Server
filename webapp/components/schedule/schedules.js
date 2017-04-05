var React = require('react');
var moment=require("moment");
var css=require("./schedule.scss");
var utils=require("utils/switch");
import store from 'store';
var Schedule = require('./schedule.js');
var cn=require("classnames");
import {Select} from "components/UI/select/select"
var Button= require('components/UI/button/button');

const SchedulerContainer = React.createClass({
  handleSchedule:function(){
    let change={open:!this.props.state.open}
    let when={unit:"minutes", value:this.timer_select.value()}
    utils.addSchedule(this.props.node, {change:change, when:when}).then(function(schedule){
      console.log("SCHEDULE", schedule)
      store.dispatch({
        type: 'SET_SCHEDULE',
        node:this.props.node,
        schedule:schedule
      })
    }.bind(this))
  },
  render:function(){
    return (
      <span>
        { this.props.schedules.length>0 &&
          <div className={css.schedules_container}>
            { this.props.schedules.map(function(s){
                return <Schedule node={this.props.node} key={s.uuid} schedule={s}></Schedule>
              }.bind(this))
            }
          </div>
        }
        <div className={cn(css.subtitle)}>Turn {this.props.label} in</div>
        <Select label="" ref={(ref)=>this.timer_select=ref} />
        <Button type="round" onClick={this.handleSchedule}>Schedule</Button>
      </span>
    )
  }
})


module.exports=SchedulerContainer;
