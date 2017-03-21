var React = require('react');
import Notifications, {notify} from 'react-notify-toast';
var routes = require("../config/routes");
var OnlineMessage=require("../components/online_message/online_message");
import { Provider } from 'react-redux';
import store from '../store';

var Layout = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
        <div className='main-container'>
          <OnlineMessage/>
            {routes}
          <Notifications />
        </div>
      </Provider>

    )
  }
});

module.exports = Layout;
