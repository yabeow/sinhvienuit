import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { CardItem, Right, Text, Card, Icon, Badge, View } from 'native-base';
import CountNotification from './CountNotification';

class Item extends React.Component {
  render() {
    const { course, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CourseDetails', { course: this.props.course })}
      >
        <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
          <CardItem style={{ flex: 1, justifyContent: 'space-between' }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {course.getType() === 2 && (
                <Badge info style={{ marginRight: 5 }}>
                  <Text>Thực hành</Text>
                </Badge>
              )}
              <Text style={{ flex: 1, flexWrap: 'wrap' }}>{course.getName()}</Text>
            </View>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </CardItem>
          <CardItem style={{ paddingTop: 2 }}>
            <Icon name="time" />
            <Text>
              Giờ học:{' '}
              {`${course.getLessonStart('LT')} - ${course.getLessonEnd('LT')} ngày ${course.getCurrentTimeEnd('DD/MM')}`}
            </Text>
          </CardItem>
          <CardItem style={{ paddingTop: 2 }}>
            <Icon name="home" />
            <Text>Phòng học: {course.getRoom()}</Text>
          </CardItem>
          <CountNotification
            numberNotifications={this.props.numberNotifications}
            numberDeadlines={this.props.numberDeadlines}
          />
        </Card>
      </TouchableOpacity>
    );
  }
}

Item.defaultProps = {
  numberNotifications: 0,
  numberDeadlines: 0,
};

Item.propTypes = {
  navigation: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  numberNotifications: PropTypes.number,
  numberDeadlines: PropTypes.number,
};
export default Item;
