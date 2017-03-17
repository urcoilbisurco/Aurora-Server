var React = require('react');
var cn=require('classnames');
var css=require("./button.scss");

const Button = React.createClass({
  render:function() {
    return (
      <a className={css[this.props.type]} onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  },
});

module.exports=Button;
