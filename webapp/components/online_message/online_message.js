const React=require("react");
const cn=require("classnames");
const css=require("./online_message.scss");

const OnlineMessage=function(props){
  let online=navigator.onLine ? css.online : css.offline
  console.log("ONLINE?", online)
  return (
    <div className={cn(css.online_message, online)}>
      You are currently offline.
    </div>
  )
}

module.exports=OnlineMessage;
