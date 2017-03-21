var React = require('react');
var cn=require('classnames');
var css=require("./button.scss");

const Button = React.createClass({
  render:function() {
    return (
      <span className={css[this.props.type]} onClick={this.props.onClick}>
        {this.props.children}
      </span>
    );
  },
});

module.exports=Button;
