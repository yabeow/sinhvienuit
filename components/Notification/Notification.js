import React, { PropTypes } from "react";
import NotificationList from './compoments/List';
import styles from '../../Style';

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Thông báo',
        ...styles.Header
    };
    render() {
        this.notification = this.props.notifications.getGeneralNotifications().toArray();
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
            <NotificationList
                notifications = { this.notification }
                refreshing = { this.props.notifications.getLoading() }
                onRefresh = { this.props.getNotification }
            />
        );
    }
}
Notification.propsType = {
    notifications: PropTypes.object.isRequired
};
export default Notification;
