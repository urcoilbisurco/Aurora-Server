var React = require('react');
import {MdClose} from 'react-icons/lib/md';
var moment=require("moment");
var css=require("./user.scss");
var utils=require("utils/switch");
import store from 'store';

const User=React.createClass({
  onClick:function(){
    // store.dispatch({
    //   type: 'REMOVE_USER',
    //   node:this.props.node,
    //   user:this.props.user
    // })
    utils.removeUser(this.props.node, this.props.user).then(function(schedule){
      console.log("DONE");
    }.bind(this))
    // utils.removeSchedule(this.props.node, this.props.schedule.uuid).then(function(schedule){
    //   store.dispatch({
    //     type: 'REMOVE_SCHEDULE',
    //     node:this.props.node,
    //     schedule:this.props.schedule.uuid
    //   })
    // }.bind(this))
  },
  render:function(){
    return(
      <div className={css.user}>
        {this.props.user}
        <span onClick={this.onClick} className={css.delete}><MdClose></MdClose></span>
      </div>
    )
  }
})


module.exports=User;
