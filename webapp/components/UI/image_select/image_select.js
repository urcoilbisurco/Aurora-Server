var React = require('react');
var css=require("./image_select.scss");
var cn=require("classnames");
var Anime = require("react-anime").default;
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
  componentDidMount:function(){
    this.setState({rendered:true})
  },
  getInitialState:function(){
    return {
      selected:this.props.images[0],
      rendered:false
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
          <Anime opacity={[0, 1]} autoplay={!this.state.rendered} duration={1500} translateX={['-1em','0em']} delay={(e, i) => (i * 200)+300}>
            { this.props.images.map((image)=>{
                return <span key={image} ><Image selected={this.state.selected==image}  onClick={this.handleClick} url={image} /></span>
              })
            }
          </Anime>

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
        "switch",
        "temperature"
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
