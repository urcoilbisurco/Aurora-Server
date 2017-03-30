var React = require('react');
var css=require("./page_container.scss");
import {MdArrowBack, MdClose} from 'react-icons/lib/md';
import { Link } from 'react-router-dom'
var Anime = require("react-anime").default;

var Container=React.createClass({
  getDefaultProps:function(){
    return {
      icon:"",
      animate:true
    }
  },
  render:function(){
    return (
      <div className={css.container}>
      <Anime autoplay={this.props.animate} opacity={[0, 1]} duration={1500} translateX={['-1em','0em']} delay={(e, i) => i * 300}>
        <span>
          {this.props.icon=="back" &&
            <Link className={css.icon} to="/" replace><MdArrowBack/></Link>
          }
          {this.props.icon=="close" &&
            <Link className={css.icon} to="/" replace><MdClose/></Link>
          }
        </span>
        {this.props.children}
      </Anime>
      </div>
    )
  }
})

module.exports=Container;
