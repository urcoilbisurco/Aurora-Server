var React = require('react');
var cn=require('classnames');
var css=require("./slider.scss");
var ReactSlider=require("react-slider");

const Slider = React.createClass({
  render:function() {
    return (
      <ReactSlider
        min={0}
        className={css.slider}
        handleClassName={css.handle}
        max={254}
        onAfterChange={this.props.onChange}
        handleActiveClassName={css.handle_active}
        defaultValue={this.props.value}
      />
    )
  },
});

module.exports=Slider;
