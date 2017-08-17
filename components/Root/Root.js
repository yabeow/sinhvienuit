import React from 'react';
import Login from '../Login';
import Navigator from '../Navigator';

export default class extends React.Component {
    render() {
        return (
            (this.props.loggedIn === true) ?
                <Navigator /> : <Login />
        );
    }
}