import React from 'react';
import { Container } from 'native-base';
import Login from '../Login';
import Navigator from '../Navigator';

export default class extends React.Component {
    render() {
        return (
            <Container>
            {
                (this.props.loggedIn === true) ?
                    <Navigator /> : <Login />
            }
            </Container>
        );
    }
}