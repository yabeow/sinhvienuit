import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  View,
  Toast,
} from 'native-base';
import { backAction } from '../../config/config';
import NotificationList from './components/List';

const sortNotifications = (notifications) => {
  // Sắp xếp theo thứ tự thời gian đăng giảm dần.
  const currentTime = new Date().getTime();
  return notifications.sort((a, b) => {
    let timeA;
    let timeB;
    timeA = a.getCreateTime().getTime();
    timeB = b.getCreateTime().getTime();
    // Ưu tiên thông báo nghỉ/bù môn học.
    if (typeof a.getCode !== 'undefined') {
      if (a.getEndTime() > currentTime) {
        timeA += 9999999999999;
      }
    }
    if (typeof b.getCode !== 'undefined') {
      if (b.getEndTime() > currentTime) {
        timeB += 9999999999999;
      }
    }
    if (timeA > timeB) return -1;
    if (timeA < timeB) return 1;
    return 0;
  });
};

class Notification extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const { notifications } = props;
    this.state = {
      notifications: sortNotifications(notifications),
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Toast.show({
        text: nextProps.error,
        position: 'bottom',
        buttonText: 'Bỏ qua',
        type: 'warning',
        duration: 10000,
      });
      this.props.setError(false);
    } else if (nextProps.refreshing === false && this.props.refreshing === true) {
      Toast.show({
        text: 'Cập nhật thông tin thành công',
        position: 'bottom',
        buttonText: 'Bỏ qua',
        type: 'success',
        duration: 10000,
      });
    }
    const { notifications } = nextProps;
    if (notifications !== this.props.notifications) {
      this.setState({ notifications: sortNotifications(notifications) });
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.dispatch(backAction)} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Thông báo</Title>
          </Body>
          <Right />
        </Header>
        <View padder style={{ flex: 1 }}>
          <NotificationList
            notifications={this.state.notifications}
            refreshing={this.props.refreshing}
            onRefresh={this.props.getNotification}
          />
        </View>
      </Container>
    );
  }
}

Notification.defaultProps = {
  refreshing: false,
  error: '',
  getNotification: () => {},
};

Notification.propTypes = {
  refreshing: PropTypes.bool,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  getNotification: PropTypes.func,
  notifications: PropTypes.array.isRequired,
};
export default Notification;
