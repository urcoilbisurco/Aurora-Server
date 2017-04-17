var React = require('react');
var css=require("./header_card.scss");

const Time=React.createClass({
  componentDidMount:function(){
    setInterval(function(){
      this.setState(this.setupTime(new Date()))
    }.bind(this), 60000);
  },
  setupTime:function(time){
    return {
      hour: (time.getHours()>=10) ? time.getHours() : "0"+time.getHours(),
      minutes: (time.getMinutes()>=10) ? time.getMinutes() : "0"+time.getMinutes()
    }
  },
  getInitialState:function() {
    return this.setupTime(new Date());
  },
  render:function(){
    return (
      <div className={css.time}>{this.state.hour}:{this.state.minutes}</div>
    )
  }
});

const HeaderCard = React.createClass({
  sayHi:function(name){
    var hours=(new Date()).getHours();
    var greeting="";
    if(hours<6){greeting="Good night"}
    if(hours>=6 & hours <= 12){greeting="Good morning"}
    if(hours>=13 & hours <= 20){greeting="Good afternoon"}
    if(hours>20){greeting="Good evening";}
    if(name){
      greeting=greeting+", "+name+".";
    }else{
      greeting=greeting+", my friend.";
    }
    return greeting;
  },

  render:function(){
    var hi=this.props.user.info ? this.sayHi(this.props.user.info.name) : "";
    // <Time/>
    return (
      <div className={css.header}>
        <div className={css.main}>

          <div className={css.title}>
            {hi}
          </div>
        </div>
      </div>
    );
  },
});

module.exports=HeaderCard;
