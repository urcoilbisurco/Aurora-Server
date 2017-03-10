var React = require('react');

var Layout = React.createClass({
  render: function () {
    return (
      <div className='main-container'>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Layout;
