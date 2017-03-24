var React = require('react');
var TemperatureUI=require("./temperature_ui");
const TemperatureCard = React.createClass({
  componentDidMount:function(){
    // utils.getWeather().then(function(data){
    //   this.setState(data);
    // }.bind(this));
  },
  getInitialState:function() {
    return {
      temp:"-",
      descr:"-",
      open:false
    };
  },
  handleClick:function(){
    this.setState({
      open:!this.state.open,
    })
  },
  render:function() {
    var descr="Humidity: "+this.state.descr
    return (
      <TemperatureUI
      title="Indoor"
      background="indoor.jpg"
      temperature={this.state.temp}
      open={this.state.open}
      onClick={this.handleClick}
      description={descr}
    />
  )},
});


module.exports=TemperatureCard;
