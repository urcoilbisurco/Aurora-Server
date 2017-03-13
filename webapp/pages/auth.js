var React = require('react');
var Redirect = require('react-router').Redirect;
var auth_utils= require("../utils/auth");
var storage=require("../utils/storage");
var Input= require("../components/UI/input/input");
var Button= require("../components/UI/button/button");
import {notify} from 'react-notify-toast';

const AuthPage = React.createClass({
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
    if(this.state.login){
      //handle login
      auth_utils
      .login({email:this.input_email.value(), password:this.input_password.value()})
      .then((response)=>{
        console.log("response", response)
        storage.set("access_token", response.user.token)
        setTimeout(()=>{
          this.context.router.push("/")
        },500)
      })
      .catch((error, data)=>{
        notify.show('Wrong password.', "error");
      })
      //
    }else{
      //handle register
      auth_utils
      .register({email:this.input_email.value(), password:this.input_password.value(), name:this.input_name.value()})
      .then((response)=>{
        storage.set("access_token", response.user.token)
        setTimeout(()=>{
          //USE redux?
          this.context.router.push("/")
        },500)
      })
      .catch((error)=>{

      })

    }
  },
  render:function() {
    var title= this.state.login ? "Login" : "Register"
    var alter_button= !this.state.login ? "Login" : "Register"
    return (
      <div>
        <h3>{title}</h3>
        <Input label="Email" ref={(ref) => this.input_email = ref} />
        {!this.state.login &&
          <Input label="Name" ref={(ref) => this.input_name = ref} />
        }
        <Input label="Password" type="password"  ref={(ref) => this.input_password = ref} />
        <Button onClick={this.handleClick}>{title}</Button>
        <Button onClick={this.handleForm}>{alter_button} instead</Button>
      </div>
    );
  },
});

module.exports=AuthPage;
