var React = require('react');
var Switch= require('../switch/switch');
var utils=require("../../utils/switch");
var css=require("./switch_card.scss");

const SwitchCard = React.createClass({
  componentDidMount:function(){
    utils.getStatus(this.props.node)
    .then(function(state){
      console.log("STATE?", state)
      this.setState(state.state)
    }.bind(this))
  },
  getInitialState:function() {
    return this.props.state;
  },
  onChange:function(what){
    let change={open: !this.state.open}
    this.setState(change)
    utils.setStatus(this.props.node, change)
  },
  render:function() {
    console.log("this", this.state)
    let label=(this.state.open ? "on" : "off");
    let background={
      "backgroundImage":"url('./assets/"+this.props.background+".jpg')",
    }
    return (
      <div className={css.switch_card}>
        <div className={css.main} style={background}>
          <div className={css.text_container}>
            <div className={css.text}>{this.props.name} {this.props.verb} {label}</div>
            <Switch className={ css.switch } open={this.state.open} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports=SwitchCard;
