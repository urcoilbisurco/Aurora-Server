var React = require('react');
var Redirect = require('react-router').Redirect;
var css=require("./nodes.scss");
var nodes_utils= require("utils/nodes");
var Input= require("components/UI/input/input");
var Button= require("components/UI/button/button");
var Container=require("components/UI/page_container/index");
var Switch= require('components/switch/switch');
var utils=require("utils/switch");

import { connect } from 'react-redux';
import store from 'store';
import {ImageSelect, TypeSelect} from "components/UI/image_select/image_select"
import {notify} from 'react-notify-toast';

const NodePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  componentDidMount:function(){
    console.log(this.props.state)
  },
  // getInitialState:function() {
  //   return {
  //     login:true
  //   };
  // },
  handleClick:function(){
    nodes_utils
    .createNode({name:this.input_name.value(), image:this.image_select.value(), type:this.type_select.value()})
    .then((response)=>{
      notify.show('Node created.');
      store.dispatch({
        type: 'NEW_NODE',
        payload:response
      })
      setTimeout(()=>{
        this.context.router.history.push("/")
      },100)
    })
    .catch((error, data)=>{
      notify.show('Wrong password.', "error");
    })
  },
  onChange:function(what){
    console.log("THIS.props.state", this.props.uuid)
    let change={open: !this.props.state.open}
    console.log("THIS change", change)
    store.dispatch({
      type: 'SET_STATUS',
      node:this.props.uuid,
      state:change
    })
    utils.setStatus(this.props.uuid, change)
  },
  render:function() {
    return (
      <Container icon="back" background={this.props.image}>
        <div className={css.container}>
          <h3>{this.props.name}</h3>
            <Switch className={ css.switch } open={this.props.state.open} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
        </div>
      </Container>

    );
  },
});

const mapStateToProps = function(state, opts) {
  let node=opts.location.pathname.split("/").pop();
  console.log(state)
  //console.log(state.nodes.find(function(n){return n.uuid==node}));
  return state.nodes.find(function(n){return n.uuid==node});
}

module.exports=connect(mapStateToProps)(NodePage);
