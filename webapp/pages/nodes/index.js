var React = require('react');
var Redirect = require('react-router').Redirect;
var css=require("./nodes.scss");
var nodes_utils= require("../../utils/nodes");
var Input= require("../../components/UI/input/input");
var Button= require("../../components/UI/button/button");
var ImageSelect= require("../../components/UI/image_select/image_select");
import {notify} from 'react-notify-toast';
var Container=require("../../components/UI/page_container/index");

const NodesPage = React.createClass({
  contextTypes:{
    router:React.PropTypes.object.isRequired
  },
  getInitialState:function() {
    return {
      login:true
    };
  },
  handleForm:function(){
    this.setState({
        login:!this.state.login
    })
  },
  handleClick:function(){
    nodes_utils
    .createNode({name:this.input_name.value(), image:this.image_select.value()})
    .then((response)=>{
      notify.show('Node created.');
      console.log("????????????", response)
      this.context.router.history.push("/")
    })
    .catch((error, data)=>{
      notify.show('Wrong password.', "error");
    })
    //
  },
  render:function() {
    return (
      <Container icon="back">
        <div className={css.container}>
          <h3>Add new node</h3>
          <Input label="Name of your node" ref={(ref) => this.input_name = ref} />
          <span className={css.select}>
            <ImageSelect ref={(ref)=>this.image_select=ref} />
          </span>
        <Button type="button" onClick={this.handleClick}>Save</Button>
        </div>
      </Container>

    );
  },
});

module.exports=NodesPage;
