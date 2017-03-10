var React = require('react');
var cn=require("classnames");

var css=require("./switch.scss");

const Switch = React.createClass({
  render:function(){
    return (
      <span onClick={this.props.onChange} className={cn(css.switch, this.props.className)}>
        <span className={cn(css.handler, this.props.on ? css.off : css.on)}></span>
      </span>
    )
  }
});

module.exports = Switch;
