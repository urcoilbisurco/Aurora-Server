var React = require('react');
import Notifications, {notify} from 'react-notify-toast';
var routes = require("../config/routes");
import { Provider } from 'react-redux';
import store from '../store';
var Layout = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
        <div className='main-container'>
          {routes}
          <Notifications />
        </div>
      </Provider>

    )
  }
});

module.exports = Layout;
