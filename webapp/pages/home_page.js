var React = require('react');
var Redirect = require('react-router').Redirect;
var SwitchCard=require("../components/switch_card/switch_card");
var SceneCard=require("../components/scene_card/scene_card");
var Section=require("../components/UI/section/section");
var HeaderCard=require("../components/header/header_card");
var WeatherCard=require("../components/temperature/temperature_outdoor");
var IndoorCard=require("../components/temperature/temperature_indoor");
var utils=require("../utils/auth");
var storage=require("../utils/storage");
var Anime = require("react-anime").default;

import { Link } from 'react-router-dom'

const HomePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  componentDidMount:function(){
    if(!this.state.token){
      this.context.router.push("/auth")
    }else{
      console.log("get User State???", this.state.token)
      utils.getUserState(this.state.token).then(function(state){
        console.log("???", state)
        this.setState(state)
      }.bind(this))
    }
  },
  getInitialState:function(){
    console.log("getInitialState", storage.get("access_token"))
    return {
      token: storage.get("access_token"),
      info:{
        name:""
      },
      nodes:[]
    }
  },
  render:function() {
    return (
      <div>
        <HeaderCard name={this.state.info.name}/>
        <Anime opacity={[0, 1]} duration={1000} translateY={['-1em','0em']} delay={(e, i) => i * 300}>
        <div>
          <WeatherCard/>
          <IndoorCard />
        </div>
        <div>
          <Section title="Controls" direction="horizontal">
            { this.state.nodes.map((node)=>{
                return (

                  <SwitchCard name={node.name} node={node._id} key={node._id} state={node.state} verb="is" background="star-lights" toggle="stars"/>
                )
              })
            }
          </Section>
        </div>
        <div>
          <Section title="Scenes" direction="horizontal">
            <SceneCard name="Reading" background="star-lights" toggle="-"/>
            <SceneCard name="Telefilm" background="main-lights" toggle="-"/>
          </Section>
          <div class="settings">
            <Link to="/nodes">Add new node</Link>
          </div>
      </div>
      </Anime>
      </div>
    );

  },
});

module.exports=HomePage;
