import React, { PropTypes } from 'react';
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

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
  };
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
    } else {
      if (nextProps.refreshing === false && this.props.refreshing === true) {
        Toast.show({
          text: 'Cập nhật thông tin thành công',
          position: 'bottom',
          buttonText: 'Bỏ qua',
          type: 'success',
          duration: 10000,
        });
      }
    }
  }
  render() {
    const { notifications } = this.props;
    //Sắp xếp theo thứ tự thời gian đăng giảm dần.
    let currentTime = new Date().getTime();
    notifications.sort(function(a, b) {
      let timeA, timeB;
      timeA = a.getCreateTime().getTime();
      timeB = b.getCreateTime().getTime();
      //Ưu tiên thông báo nghỉ/bù môn học.
      if (typeof a.getCode !== 'undefined') {
        if (a.getEndTime() > currentTime) {
          timeA = timeA + 9999999999;
        }
      }
      if (typeof b.getCode !== 'undefined') {
        if (b.getEndTime() > currentTime) {
          timeB = timeB + 9999999999;
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
            notifications={notifications}
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
  onRefresh: () => {},
};

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
};
export default Notification;
