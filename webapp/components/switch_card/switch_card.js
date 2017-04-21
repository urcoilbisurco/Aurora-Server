var React = require('react');
var Switch= require('components/switch/switch');
var utils=require("utils/switch");
var css=require("./switch_card.scss");
import store from 'store';
import { Link } from 'react-router-dom'

const SwitchCard = React.createClass({
  onChange:function(what){
    let c=Object.assign({}, this.props.state, {open: !this.props.state.open})
    store.dispatch({
      type: 'SET_STATUS',
      node:this.props.node,
      state:c
    })
    utils.setStatus(this.props.node, c)
  },
  render:function() {
    let label=(this.props.state.open ? "on" : "off");
    let background={
      "backgroundImage":"url('"+this.props.image+"')",
    }
    return (
      <div className={css.switch_card}>
        <div className={css.main} style={background}>
          <div className={css.text_container}>
            <div className={css.text}>
              <Link to={"/nodes/"+this.props.node}>{this.props.name} {this.props.verb} {label}</Link>
              </div>


            { !this.props.editMode &&
              <Switch className={ css.switch } open={this.props.state.open} onChange={this.onChange} labelOff={"Switch On"} labelOn={"Switch Off"} />
            }
        </div>
        </div>
      </div>
    );
  },
});

module.exports=SwitchCard;
