var React = require('react');
var SwitchCard=require("components/switch_card/switch_card");
var SceneCard=require("components/scene_card/scene_card");
var Section=require("components/UI/section/section");
var HeaderCard=require("components/header/header_card");
var WeatherCard=require("components/temperature/temperature_outdoor");
var IndoorCard=require("components/temperature/temperature_indoor");
var utils=require("utils/auth");
var storage=require("utils/storage");
var Anime = require("react-anime").default;
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import store from 'store';

const HomePage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  componentDidMount:function(){
    this.setState({rendered:true})
    if(!this.props.user.authenticated){
      this.context.router.history.push("/auth")
    }else{
      utils.getUserState(this.props.token).then(function(state){
        store.dispatch({
          type: 'GET_USER_STATE',
          payload:state
        })
      }.bind(this))
    }
  },
  getInitialState:function(){
    return {
      rendered:false
    }
  },
  getDefaultProps:function(){
    return {
      token: storage.get("access_token"),
      info:{
        name:""
      },
      nodes:[]
    };
  },
  render:function() {
    return (
      <div>
        <HeaderCard name={this.props.info.name}/>
        <Anime autoplay={!this.state.rendered} opacity={[0, 1]} duration={1000} translateY={['-1em','0em']} delay={(e, i) => i * 300}>
        <div>
          <WeatherCard/>
          <IndoorCard />
        </div>
        <div>
          <Section title="Controls" direction="horizontal">
            { this.props.nodes.filter((n)=>{return n.type=="switch"}).map((node)=>{
                return (
                  <SwitchCard name={node.name} node={node.uuid} key={node.uuid} image={node.image} state={node.state} verb="is" background="star-lights" toggle="stars"/>
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
          <div className="settings">
            <Link to="/nodes">Add new node</Link>
          </div>
      </div>
      </Anime>
      </div>
    );

  },
});

const mapStateToProps = function(state) {
  return state;
}

module.exports=connect(mapStateToProps)(HomePage);
