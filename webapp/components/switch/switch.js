import React from "react";
import cn from "classnames";
import css from "./switch.scss";

const Switch = props =>{
  return (
    <span onClick={props.onChange} className={cn(css.switch, props.className)}>
      <span className={cn(css.handler, props.open ? css.off : css.on)}></span>
    </span>
  )
}

export default Switch;
module.exports = Switch;
