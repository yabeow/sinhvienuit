import React from "react";
import { Text, Button, Container, Icon, Body, Content, Header, Title, Left, Right } from "native-base";
import styles from '../../Style';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Dashboard',
        ...styles.Header
    };
    render() {
        return (
            <Container>
                <Content padder>
                    <Text>Some thing here!</Text>
                </Content>
            </Container>
        );
    }
}