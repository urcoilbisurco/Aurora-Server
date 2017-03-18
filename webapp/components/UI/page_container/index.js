var React = require('react');
var css=require("./page_container.scss");
import {MdArrowBack, MdClose} from 'react-icons/lib/md';
import { Link } from 'react-router-dom'
require('velocity-animate');
var Anime = require("react-anime").default;

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
      <div className={css.container}>
      <Anime opacity={[0, 1]}  duration={1000} translateY={['-1em','0em']} delay={(e, i) => i * 300}>
        <span>
          {this.props.icon=="back" &&
            <Link className={css.icon} to="/"><MdArrowBack/></Link>
          }
          {this.props.icon=="close" &&
            <Link className={css.icon} to="/"><MdClose/></Link>
          }
        </span>
        {this.props.children}
      </Anime>
      </div>
    )
  }
})

module.exports=Container;
