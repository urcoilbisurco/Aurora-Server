var React = require('react');
import Notifications, {notify} from 'react-notify-toast';

var Layout = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        {this.props.children}
        <Notifications />
      </div>
    )
  }
});

module.exports = Layout;
