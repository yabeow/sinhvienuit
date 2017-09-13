import React from 'react';
import Intro from '../Intro';
import Login from '../Login';
import Navigator from '../Navigator';

export default class extends React.Component {
    render() {
        return (
            (this.props.firstTime === true) ?
                <Intro /> :
            (this.props.loggedIn === true) ?
                <Navigator /> : <Login />
        );
    }
}