var React = require('react');
var css=require("./input.scss");
var cn=require("classnames");
const Input = React.createClass({
  value:function(){
    return this.text.value;
  },
  getDefaultProps:function(){
    return {
      type:"text"
    }
  },
  render:function() {
    return (
      <div className={cn(css.container, css[this.props.theme])} onClick={this.props.onClick}>
        {this.props.label &&
          <label className={css.label}>{this.props.label}</label>
        }
        <input ref={(ref) => this.text = ref} type={this.props.type} placeholder={this.props.placeholder} className={css.input} defaultValue={this.props.value}/>
      </div>
    );
  },
});
export default Input;
module.exports=Input;
