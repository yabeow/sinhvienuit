import React, { PropTypes } from "react";
import { Container, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';
import NotificationList from './compoments/List';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.notification = this.props.notifications.getAllNotifications();
        //Sắp xếp theo thứ tự thời gian đăng giảm dần.
        this.notification.sort(function(a, b) {
            let timeA, timeB;
            timeA = a.getCreateTime();
            timeB = b.getCreateTime();
            if (timeA > timeB) return -1;
            if (timeA < timeB) return 1;
            return 0;
        });
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.navigate('DrawerOpen') } transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Thông báo</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{flex: 1}}>
                    <NotificationList
                        notifications = { this.notification }
                        refreshing = { this.props.notifications.getLoading() }
                        onRefresh = { this.props.getNotification }
                    />
                </View>
            </Container>
        );
    }
}
Notification.propsType = {
    notifications: PropTypes.object.isRequired
};
export default Notification;
