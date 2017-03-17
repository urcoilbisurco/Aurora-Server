var React = require('react');
import Notifications, {notify} from 'react-notify-toast';
var routes = require("../config/routes");
var Layout = React.createClass({
  render: function () {
    console.log(routes)
    return (
      <div className='main-container'>
        {routes}
        <Notifications />
      </div>
    )
  }
});

module.exports = Layout;
