import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Intro from '../Intro';
import Login from '../Login';
import Navigator from '../Navigator';

class Root extends React.Component {
  render() {
    if (this.props.firstTime === true) {
      return <Intro />;
    } else if (this.props.loggedIn === true) {
      return (
        <StyleProvider style={getTheme(material)}>
          <Navigator />
        </StyleProvider>
      );
    }
    return (
      <StyleProvider style={getTheme(material)}>
        <Login />
      </StyleProvider>
    );
  }
}

Root.propTypes = {
  firstTime: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Root;
