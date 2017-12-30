import React, { PropTypes } from 'react';
import Intro from '../Intro';
import Login from '../Login';
import Navigator from '../Navigator';

class Root extends React.Component {
  render() {
    if (this.props.firstTime === true) {
      return <Intro />;
    } else if (this.props.loggedIn === true) {
      return <Navigator />;
    }
    return <Login />;
  }
}

Root.propTypes = {
  firstTime: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Root;
