var React = require('react');
var cn=require('classnames');
var css=require("./button.scss");
import { Link } from 'react-router-dom'

const Button = React.createClass({
  render:function() {
    if(this.props.to){
      return (
        <span className={css.cont}>
      <Link to={this.props.to}>
          <span className={css[this.props.type]}>
            {this.props.children}
        </span>
      </Link></span>

      )
    }else{
      return (
        <span className={css[this.props.type]} onClick={this.props.onClick}>
          {this.props.children}
        </span>
      )
    }
  },
});
export default Button
module.exports=Button;
