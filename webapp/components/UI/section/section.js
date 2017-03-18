var React = require('react');
var css=require("./section.scss");
var cn=require("classnames");


var Section=function(props){
  return (
    <div className={cn(css.section)}>
      <div className={css.section_title}>{props.title}</div>
      <span className={props.direction=="horizontal" ? css.horizontal : ""}>
      {props.children}
      </span>
    </div>
  )
};
module.exports = Section;
