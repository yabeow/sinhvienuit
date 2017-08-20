import React, { PropTypes } from "react";
import { Container, Header, Left, Button, Icon, Body, Title, Right, View, Toast } from 'native-base';
import { backAction } from '../../config/config';
import DeadlineList from './components/List';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            Toast.show({
                text: nextProps.error,
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setError(false);
        }
        else {
            if ((nextProps.refreshing === false) && (this.props.refreshing === true)) {
                Toast.show({
                    text: 'Cập nhật thông tin thành công.',
                    position: 'bottom',
                    buttonText: 'Bỏ qua',
                    type: 'success',
                    duration: 10000
                });
            }
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.dispatch(backAction) } transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Deadline</Title>
                    </Body>
                    <Right />
                </Header>
                <View padder style={{ flex: 1 }}>
                    <DeadlineList
                        deadlines={ this.props.deadlines }
                        refreshing={ this.props.refreshing }
                        onRefresh={ this.props.onRefresh }
                    />
                </View>
            </Container>
        );
    }
}
Notification.propsType = {
    notifications: PropTypes.object.isRequired,
    refreshing: PropTypes.boolean,
    onRefresh: PropTypes.func
};
export default Notification;