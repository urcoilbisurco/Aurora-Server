var React = require('react');
var cn=require('classnames');
var css=require("./button.scss");

const Button = React.createClass({
  render:function() {
    return (
      <div className={cn(css.button, css.normal)} onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  },
});

module.exports=Button;
