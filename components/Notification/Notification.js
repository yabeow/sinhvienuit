import React, { PropTypes } from "react";
import { Image } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';
import NotificationList from './components/List';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.notification = this.props.notifications.getAllNotifications();
        //Sắp xếp theo thứ tự thời gian đăng giảm dần.
        let currentTime = new Date();
        this.notification.sort(function(a, b) {
            let timeA, timeB;
            timeA = a.getCreateTime();
            timeB = b.getCreateTime();
            //Ưu tiên thông báo nghỉ/bù môn học.
            if (typeof a.getCode !== 'undefined') {
                if (a.getEndTime() > currentTime) {
                    timeA = timeA - 999999;
                }
            }
            if (typeof b.getCode !== 'undefined') {
                if (b.getEndTime() > currentTime) {
                    timeB = timeB - 999999;
                }
            }
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
                <View padder style={{ flex: 1 }}>
                    {
                        (this.props.notifications.length === 0) ?
                        <Image
                            resizeMode="contain"
                            style={{flex: 1, height: undefined, width: undefined}}
                            source={ require('../../assets/pull-to-refresh.gif')}
                        >
                            <NotificationList
                                notifications={ this.notification }
                                refreshing={ this.props.notifications.getLoading() }
                                onRefresh={ this.props.getNotification }
                            />
                        </Image>
                            :
                        <NotificationList
                            notifications={ this.notification }
                            refreshing={ this.props.notifications.getLoading() }
                            onRefresh={ this.props.getNotification }
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
