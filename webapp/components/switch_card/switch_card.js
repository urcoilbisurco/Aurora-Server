var React = require('react');
var Switch= require('../switch/switch');
var utils=require("../../utils/particle");
var css=require("./switch_card.scss");

const SwitchCard = React.createClass({
  componentDidMount:function(){
    if(this.props.toggle!="-"){
      utils.getStatus(this.props.toggle)
      .then(function(state){
        this.setState({
          on:state
        })
      }.bind(this))
    }
  },
  getInitialState:function() {
    return {
      on:0,
    };
  },
  onChange:function(what){
    n=this.state.on==0 ? 1 : 0
    this.setState({
      on: n
    })
    d=(n==1 ? "on" : "off");
    utils.setStatus(this.props.toggle, {arg:d})
  },
  render:function() {
    label=(this.state.on ? "on" : "off");
    background={
      "backgroundImage":"url('./src/assets/"+this.props.background+".jpg')",
    }
    return (
      <div className={css.switch_card}>
        <div className={css.main} style={background}>
          <div className={css.text_container}>
            <div className={css.text}>{this.props.name} {this.props.verb} {label}</div>
            <Switch className={ css.switch } on={this.state.on} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
          </div>
        </div>
      </div>
    );
  },
});

module.exports=SwitchCard;
