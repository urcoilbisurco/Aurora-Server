var React = require('react');
var css=require("./round_image.scss");

const RoundImage=function(props){
  console.log(props)
  const background={
      "backgroundImage":"url('"+props.src+"')",
  }
  return (
    <div className={css.container}>
      <div className={css.image} style={background}/>
    </div>
  )
}

module.exports=RoundImage;
