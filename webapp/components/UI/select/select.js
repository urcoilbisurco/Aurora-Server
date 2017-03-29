var React = require('react');
var css=require("./select.scss");
var cn=require("classnames");
var Anime = require("react-anime").default;

var Option=React.createClass({
  handleClick:function(){
    return this.props.handleClick(this.props.option)
  },
  render:function(){
    return (
      <div className={cn(css.option, (this.props.selected) ? css.selected :"")} onClick={this.handleClick}>
        {this.props.option} min
      </div>
    )
  }
})
var Select=React.createClass({
  getDefaultProps:function(){
    return {
      options:[1,5,10,20,30,60],
      label:"Turn off in",
    }
  },
  componentDidMount:function(){
    this.setState({rendered:true})
  },
  getInitialState:function(){
    return {
      selected:this.props.options[0],
      rendered:false
    }
  },
  value:function(){
    return this.state.selected
  },
  handleClick:function(option){
    this.setState({
      selected:option
    })
    if (this.props.callback){
      this.props.callback(option)
    }
  },
  render:function(){
    return (
      <div>
        <label className={css.label}>{this.props.label}</label>
        <div className={css.select_container}>
          <Anime opacity={[0, 1]} autoplay={!this.state.rendered} duration={1500} translateX={['-1em','0em']} delay={(e, i) => (i * 200)+300}>
            { this.props.options.map((option)=>{
                return (
                  <span key={option}>
                    <Option selected={this.state.selected==option} option={option} handleClick={this.handleClick}/>
                  </span>
                )
              })
            }
          </Anime>

        </div>
      </div>
    )
  }
})


export {Select}
