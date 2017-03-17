var React = require('react');
var css=require("./image_select.scss");
var cn=require("classnames");

var Image=  React.createClass({
  handleClick:function(){
    this.props.onClick(this.props.url)
  },
  render:function(){
    let background={
      "backgroundImage":"url('"+this.props.url+"')",
    }
    return (
      <div className={cn(css.image, this.props.selected ? css.selected :"")} onClick={this.handleClick} style={background} >
        <div className={css.overlay}></div>
      </div>
    )
  }
})
var ImageSelect=React.createClass({
  getDefaultProps:()=>{
    return {
      images:[
        "/assets/indoor.jpg",
        "/assets/outdoor.jpg",
        "/assets/netflix.jpg",
        "/assets/main-lights.jpg",
        "/assets/star-lights.jpg"
      ]
    }
  },
  getInitialState:()=>{
    return {
      selected:undefined,
    }
  },
  value:function(){
    return this.state.selected
  },
  handleClick:function(image){
    this.setState({
      selected:image
    })
  },
  render:function(){
    return (
      <div className={cn(css.image_select)}>
        <label className={css.label}>Choose Image</label>
        <div className={css.image_container}>
        { this.props.images.map((image)=>{
            return <Image selected={this.state.selected==image} key={image} onClick={this.handleClick} url={image} />
          })
        }
        </div>
      </div>
    )
  }
})
module.exports = ImageSelect;
