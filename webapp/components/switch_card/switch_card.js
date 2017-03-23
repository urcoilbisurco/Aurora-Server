var React = require('react');
var Switch= require('components/switch/switch');
var utils=require("utils/switch");
var css=require("./switch_card.scss");
import store from 'store';

const SwitchCard = React.createClass({
  // componentDidMount:function(){
  //   utils.getStatus(this.props.node)
  //   .then(function(state){
  //     this.setState(state.state)
  //   }.bind(this))
  // },
  onChange:function(what){
    let change={open: !this.props.state.open}
    console.log("was", this.props.state.open)
    console.log("now is ", change.open)
    store.dispatch({
      type: 'SET_STATUS',
      node:this.props.node,
      state:change
    })
    utils.setStatus(this.props.node, change)
  },
  render:function() {
    console.log("THIS PROPS OPEN", this.props.state.open)
    let label=(this.props.state.open ? "on" : "off");
    let background={
      "backgroundImage":"url('./assets/"+this.props.background+".jpg')",
    }
    return (
      <div className={css.switch_card}>
        <div className={css.main} style={background}>
          <div className={css.text_container}>
            <div className={css.text}>{this.props.name} {this.props.verb} {label}</div>
            <Switch className={ css.switch } open={this.props.state.open} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports=SwitchCard;
