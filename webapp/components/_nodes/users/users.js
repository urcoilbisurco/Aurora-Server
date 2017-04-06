var React = require('react');
var css=require("./user.scss");
var User=require("./user.js");
// var utils=require("utils/switch");
// import store from 'store';
import store from 'store';
var Button=require("components/UI/button/button");
var Input=require("components/UI/input/input");

const Users=React.createClass({
  onClick:function(){
    // utils.removeSchedule(this.props.node, this.props.schedule.uuid).then(function(schedule){
    //
    // }.bind(this))

    store.dispatch({
      type: 'ADD_USER',
      node:this.props.node,
      user:this.input_email.value()
    })
  },
  render:function(){
    return(
        <div className={css.users_container}>
          <div className={css.subtitle}>
            Shared with:
          </div>
          { this.props.users.map(function(u){
              return <User node={this.props.uuid} key={u} user={u}></User>
            }.bind(this))
          }
          <Input type="email" value="francesco@earlymorning.com" theme="transparent" ref={(ref)=>this.input_email=ref} placeholder="Add email..."></Input>
          <Button type="round" onClick={this.onClick}>Add User</Button>
        </div>
    )
  }
})


module.exports=Users;
