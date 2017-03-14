var React = require('react');
var cn = require('classnames');
var css=require("./scene_card.scss");

const SceneCard = React.createClass({
  componentDidMount:function(){
    // if(this.props.toggle!="-"){
    //   utils.getStatus(this.props.toggle)
    //   .then(function(state){
    //     this.setState({
    //       on:state
    //     })
    //   }.bind(this))
    // }
  },
  onClick:function(){
    this.setState({
      open:!this.state.open
    })
  },
  getInitialState:function() {
    return {
      on:0,
      open:false
    };
  },
  onChange:function(what){
    let n=this.state.on==0 ? 1 : 0
    this.setState({
      on: n
    })
    let d=(n==1 ? "on" : "off");
    //utils.setStatus(this.props.toggle, {arg:d})
  },
  render:function() {
    let background={
      "backgroundImage":"url('./assets/"+this.props.background+".jpg')",
    }
    return (
      <div className={css.scene_card} onClick={this.onClick}>
        <div className={css.main} style={background}>
          <div className={cn(css.text_container, this.state.open ? css.open : "")}>
            <div className={css.text}>{this.props.name}</div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports=SceneCard;
