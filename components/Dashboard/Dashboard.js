import React from "react";
import { Text, Button, Container, Icon, Body, Content, Header, Title, Left, Right } from "native-base";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.navigate('DrawerOpen') } transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Dashboard</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Text>Some thing there!</Text>
                </Content>
            </Container>
        );
    }
}