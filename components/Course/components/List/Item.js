import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { CardItem, Right, Text, Card, Icon } from 'native-base';
import CountNotification from './CountNotification';

class Item extends React.Component {
  render() {
    const { course, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CourseDetails', { course: this.props.course })}
      >
        <Card>
          <CardItem>
            <Text>{course.getName()}</Text>
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
