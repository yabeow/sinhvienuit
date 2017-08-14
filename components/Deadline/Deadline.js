import React, { PropTypes } from "react";
import { Image } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';
import DeadlineList from './components/List';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null
    };
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
                    <Title>Deadline</Title>
                    </Body>
                    <Right />
                </Header>
                <View padder style={{ flex: 1 }}>
                    {
                        (this.props.deadlines.length === 0) ?
                            <Image
                                resizeMode="contain"
                                style={{flex: 1, height: undefined, width: undefined}}
                                source={ require('../../assets/pull-to-refresh.gif')}
                            >
                                <DeadlineList
                                    deadlines={ this.props.deadlines }
                                    refreshing={ this.props.refreshing }
                                    onRefresh={ this.props.onRefresh }
                                />
                            </Image>
                            :
                            <DeadlineList
                                deadlines={ this.props.deadlines }
                                refreshing={ this.props.refreshing }
                                onRefresh={ this.props.onRefresh }
                            />
                    }
                </View>
            </Container>
        );
    }
}
Notification.propsType = {
    notifications: PropTypes.object.isRequired
};
export default Notification;