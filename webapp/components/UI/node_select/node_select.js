import React from "react";
import css from "./node_select.scss";
import Switch from "components/switch/switch";
import cn from "classnames";

class NodeSelect extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected:false,
      state:{
        open:(this.props.selected || false)
      }
    }
  }
  getValue(){
    if(this.state.selected){
      console.log("SELECTED");
      return {
        uuid:this.props.node.uuid,
        state:this.state.state,
        selected:true,
      }
    }else{
      console.log("GET NOT SELECTED")
      return {uuid:this.props.node.uuid, selected:false};
    }
  }
  componentDidUpdate(){
    this.props.onChange(this.getValue())
  }
  onChange(e){
    //console.log(this.props)
    e.preventDefault();
    e.stopPropagation();
    this.setState({state:{open:!this.state.state.open}})
    return false;
  }
  onSelected(){
    this.setState({selected:!this.state.selected})
  }
  render(){
    return (
      <div onClick={this.onSelected.bind(this)} className={cn(css.node, this.state.selected ? css.selected : "")} >
        {this.props.node.name}
        {this.state.selected && <div className={css.switch_container}><Switch className={ css.switch } open={this.state.state.open} onChange={this.onChange.bind(this)}/></div>}
      </div>
    )
  }
}
class NodesSelect extends React.Component{
  constructor(props){
    super(props)
    this.nodes={}
  }
  onChange(node){
    if(node.selected){
      delete node["selected"]
      this.nodes[node.uuid]=node
    }else{
      delete this.nodes[node.uuid]
    }
    console.log(this.nodes)
  }
  render_nodes(){
    return this.props.nodes.map((n)=> <NodeSelect key={n.uuid} onChange={this.onChange.bind(this)} node={n} selected={false}/>)
  }
  value(){
    return Object.values(this.nodes);
  }
  render(){
    return(
      <div>
      <label className={css.label}>Choose some nodes</label>
      <div className={css.nodes}>
      {this.render_nodes()}
      </div>
      </div>
    )
  }
}

export default NodesSelect;
