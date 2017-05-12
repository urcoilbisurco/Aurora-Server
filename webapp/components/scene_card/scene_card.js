import React from 'react';
import cn from 'classnames';
import {notify} from 'react-notify-toast';
import utils from 'utils/nodes'
import store from 'store';
import css from "./scene_card.scss";

export default class SceneCard extends React.Component{
  onClick(){
    utils.triggerScene(this.props.scene)
    store.dispatch({
      type: 'TRIGGER_SCENE',
      triggers:this.props.triggers
    })
    notify.show("Scene triggered", "success");
  }
  render(){
    let background={
      "backgroundImage":"url('"+this.props.image+"')",
    }
    return (
      <div className={css.scene_card} onClick={this.onClick.bind(this)}>
        <div className={css.main} style={background}>
          <div className={css.text_container}>
            <div className={css.text}>{this.props.name}</div>
          </div>
        </div>
      </div>
    );
  }
}
