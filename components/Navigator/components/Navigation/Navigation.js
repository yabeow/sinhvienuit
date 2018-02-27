import React from 'react';
import PropTypes from 'prop-types';
import { Content, Text, ListItem, Icon, Container, Left, Badge, View } from 'native-base';
import Styles from '../../Style';

class Navigator extends React.Component {
  render() {
    const itemStyles = {
      Dashboard: Styles.inactiveItem,
      Notification: Styles.inactiveItem,
      Deadline: Styles.inactiveItem,
      Course: Styles.inactiveItem,
      StudentPoint: Styles.inactiveItem,
      User: Styles.inactiveItem,
    };
    // Thay đổi styles của menu đang active.
    itemStyles[this.props.activeItemKey] = Styles.activeItem;

    return (
      <Container>
        <Content bounces={false} style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
          <View style={itemStyles.Dashboard.backgroundColor}>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Left>
                <Icon active name="apps" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={itemStyles.Dashboard.textColor}>Trang chủ</Text>
              </Left>
            </ListItem>
          </View>
          <View style={itemStyles.Notification.backgroundColor}>
            <ListItem
              button
              noBorder
              onPress={() => this.props.navigation.navigate('Notification')}
            >
              <Left>
                <Icon active name="text" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={itemStyles.Notification.textColor}>Thông báo</Text>
              </Left>
            </ListItem>
          </View>
          <View style={itemStyles.Deadline.backgroundColor}>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate('Deadline')}>
              <Left>
                <Icon active name="list-box" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={{ ...Styles.textWithBadge, ...itemStyles.Deadline.textColor }}>
                  Deadline
                </Text>
                <Badge danger>
                  <Text>{this.props.numberOfDeadlines}</Text>
                </Badge>
              </Left>
            </ListItem>
          </View>
          <View style={itemStyles.Course.backgroundColor}>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate('Course')}>
              <Left>
                <Icon active name="calendar" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={{ ...Styles.textWithBadge, ...itemStyles.Course.textColor }}>
                  Môn học
                </Text>
                <Badge success>
                  <Text>{this.props.numberOfCourses}</Text>
                </Badge>
              </Left>
            </ListItem>
          </View>
          <View style={itemStyles.StudentPoint.backgroundColor}>
            <ListItem
              button
              noBorder
              onPress={() => this.props.navigation.navigate('StudentPoint')}
            >
              <Left>
                <Icon active name="body" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={{ ...Styles.textWithBadge, ...itemStyles.StudentPoint.textColor }}>
                  Điểm rèn luyện
                </Text>
                <Badge info>
                  <Text>{this.props.finalStudentPoint}</Text>
                </Badge>
              </Left>
            </ListItem>
          </View>
          <View style={itemStyles.User.backgroundColor}>
            <ListItem button noBorder onPress={() => this.props.navigation.navigate('User')}>
              <Left>
                <Icon active name="contact" style={{ color: '#777', fontSize: 26, width: 20 }} />
                <Text style={itemStyles.User.textColor}>Tài khoản</Text>
              </Left>
            </ListItem>
          </View>
        </Content>
      </Container>
    );
  }
}

Navigator.defaultProps = {
  activeItemKey: 'Dashboard',
  finalStudentPoint: 0,
  numberOfCourses: 0,
  numberOfDeadlines: 0,
};

Navigator.propTypes = {
  navigation: PropTypes.object.isRequired,
  activeItemKey: PropTypes.string,
  finalStudentPoint: PropTypes.number,
  numberOfCourses: PropTypes.number,
  numberOfDeadlines: PropTypes.number,
};
