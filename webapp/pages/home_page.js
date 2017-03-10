var React = require('react');

var SwitchCard=require("../components/switch_card/switch_card");
var SceneCard=require("../components/scene_card/scene_card");
var Section=require("../components/UI/section/section");
var HeaderCard=require("../components/header/header_card");
var WeatherCard=require("../components/temperature/temperature_outdoor");
var IndoorCard=require("../components/temperature/temperature_indoor");


const HomePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  componentWillMount:function(){
    if(!this.props.token){
      this.context.router.push("/auth")
      return;
    }
  },
  getDefaultProps:function(){
    return {
      token:undefined,
    }
  },
  render:function() {
      return (
        <div>
          <HeaderCard/>
          <WeatherCard/>
          <IndoorCard />
          <Section title="Controls" direction="horizontal">
            <SwitchCard name="Star Lights" verb="are" background="star-lights" toggle="stars"/>
            <SwitchCard name="Main Light" verb="is" background="main-lights" toggle="-"/>
            <SwitchCard name="TV" verb="is" background="netflix" toggle="tv"/>
          </Section>
          <Section title="Scenes" direction="horizontal">
            <SceneCard name="Reading" background="star-lights" toggle="-"/>
            <SceneCard name="Telefilm" background="main-lights" toggle="-"/>
          </Section>
        </div>
      );
  },
});

module.exports=HomePage;
