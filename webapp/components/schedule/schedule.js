var React = require('react');
import {MdClose} from 'react-icons/lib/md';
var moment=require("moment");
var css=require("./schedule.scss");
var utils=require("utils/switch");
import store from 'store';

const Schedule=React.createClass({
  onClick:function(){
    utils.removeSchedule(this.props.node, this.props.schedule.uuid).then(function(schedule){
      store.dispatch({
        type: 'REMOVE_SCHEDULE',
        node:this.props.node,
        schedule:this.props.schedule.uuid
      })
    }.bind(this))
  },
  render:function(){
    return(
      <div className={css.schedule}>
        Will turn {this.props.schedule.state.open ? "ON" : "OFF"} at {moment(this.props.schedule.will_process_at).format('HH:mm')}
        <span onClick={this.onClick} className={css.delete}><MdClose></MdClose></span>
      </div>
    )
  }
})


module.exports=Schedule;
