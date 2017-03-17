var React = require('react');
var css=require("./page_container.scss");
import {MdArrowBack, MdClose} from 'react-icons/lib/md';
import { Link } from 'react-router-dom'
require('velocity-animate');
var VelocityComponent = require('velocity-react').VelocityComponent;

var Container=React.createClass({
  getInitialState:function(){
    return {
      show:0
    }
  },
  componentDidMount:function(){
    setTimeout(function(){
      this.setState({show:1})
    }.bind(this),1)
  },
  render:function(){
    return (
      <VelocityComponent animation={{opacity: this.state.show}} duration="500">
      <div className={css.container}>
        {this.props.icon=="back" &&
          <Link className={css.icon} to="/"><MdArrowBack/></Link>
        }
        {this.props.icon=="close" &&
          <Link className={css.icon} to="/"><MdClose/></Link>
        }
        {this.props.children}
      </div>
      </VelocityComponent>
    )
  }
})

module.exports=Container;
