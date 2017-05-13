import React from "react";
import css from "./scenes.scss";
import store from 'store';
import { connect } from 'react-redux';
import nodes_utils from "utils/nodes";
import Input from "components/UI/input/input";
import Button from "components/UI/button/button";
import {notify} from 'react-notify-toast';
import Container from "components/UI/page_container/index";
import NodesSelect from "components/UI/node_select/node_select";
import {ImageSelect} from "components/UI/image_select/image_select"

class ScenesPage extends React.Component{
  handleClick(){
    nodes_utils
    .createScene({name:this.input_name.value(), image:this.image_select.value(), triggers:this.nodes_select.value()})
    .then((response)=>{
      notify.show('Scene created.');
      store.dispatch({
        type: 'NEW_SCENE',
        payload:response
      })
      setTimeout(()=>{
        this.props.history.push("/")
      },100)
    })
    .catch((error, data)=>{
      notify.show('Wrong password.', "error");
    })
  }
  render(){
    return (
      <Container icon="back">
        <div className={css.container}>
          <h3>Add new scene</h3>
          <Input label="Name of your scene" ref={(ref) => this.input_name = ref} />
          <span className={css.select}>
            <NodesSelect nodes={this.props.nodes.filter(n=> ["switch", "hue"].includes(n.type)) } ref={(ref)=>this.nodes_select=ref} />
          </span>
          <span className={css.select}>
            <ImageSelect ref={(ref)=>this.image_select=ref} />
          </span>

        <Button type="button" onClick={this.handleClick.bind(this)}>Save</Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = function(state) {
  return {nodes:state.nodes};
}

export default connect(mapStateToProps)(ScenesPage);
