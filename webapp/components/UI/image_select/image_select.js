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
  getDefaultProps:function(){
    return {
      images:[
        "/assets/indoor.jpg",
        "/assets/outdoor.jpg",
        "/assets/netflix.jpg",
        "/assets/main-lights.jpg",
        "/assets/star-lights.jpg"
      ],
      label:"Choose Image",
      height:"big"
    }
  },
  getInitialState:function(){
    return {
      selected:this.props.images[0],
    }
  },
  value:function(){
    return this.state.selected
  },
  handleClick:function(image){
    this.setState({
      selected:image
    })
    if (this.props.callback){
      this.props.callback(image)
    }
  },
  render:function(){
    let height=this.props.height=="big" ? css.image_container_big : css.image_container_small;
    return (
      <div>
        <label className={css.label}>{this.props.label}</label>
        <div className={cn(css.image_container, height)}>
        { this.props.images.map((image)=>{
            return <Image selected={this.state.selected==image} key={image} onClick={this.handleClick} url={image} />
          })
        }
        </div>
      </div>
    )
  }
})


var TypeSelect=React.createClass({
  getDefaultProps:function(){
    return {
      images:[
        "/icons/switch.png",
        "/icons/temp.png"
      ],
      types:[
        "switch"
        "temperature",
      ],
      label:"Node Type"
    }
  },
  getInitialState:function(){
    return {
      selected:this.props.types[0],
    }
  },
  value:function(){
    return this.state.selected
  },
  handleSelect:function(image){
    let pos=this.props.images.indexOf(image)
    let type=this.props.types[pos]
    this.setState({
      selected:type
    })
    if (this.props.callback){
      this.props.callback(type)
    }
  },
  render:function(){
    return (
      <ImageSelect height="small" images={this.props.images} label={this.props.label} callback={this.handleSelect}/>
    )
  }
})
export {TypeSelect, ImageSelect}
//module.exports = ImageSelect;
