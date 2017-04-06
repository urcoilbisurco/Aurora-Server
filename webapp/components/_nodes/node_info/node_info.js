var React = require('react');
var RoundImage=require("components/UI/round_image/round_image");
var css=require("./node_info.scss");

const NodeInfo=function(props){
  return (
    <span className={css.container}>
      <RoundImage src={props.node.image} />
      <h3 className={css.title}>{props.node.name}</h3>
    </span>
  )
}

module.exports = NodeInfo;
