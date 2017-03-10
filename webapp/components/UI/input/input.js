var React = require('react');
var css=require("./input.scss");

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
      <div className={css.container} onClick={this.props.onClick}>
        <label className={css.label}>{this.props.label}</label>
        <input ref={(ref) => this.text = ref} type={this.props.type} className={css.input} defaultValue={this.props.value}/>
      </div>
    );
  },
});

module.exports=Input;
