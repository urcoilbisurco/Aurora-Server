var React = require('react');
var TemperatureUI=require("./temperature_ui");
const TemperatureCard = React.createClass({
  getDefaultProps:function() {
    return {
      temp:"-",
      humidity:"-",
    };
  },
  getInitialState:function(){
    open:false
  },
  handleClick:function(){
    this.setState({
      open:!this.state.open,
    })
  },
  render:function() {
    var descr="Humidity: "+this.props.humidity
    return (
      <TemperatureUI
      title="Indoor"
      background="indoor.jpg"
      temperature={this.props.temp}
      open={this.state.open}
      onClick={this.handleClick}
      description={descr}
    />
  )},
});

module.exports=TemperatureCard;
