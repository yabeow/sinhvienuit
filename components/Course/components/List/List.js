import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
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
import { backAction, ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';
import ListItem from './Item';
import EmptyList from '../../../EmptyList';

const sortCourses = courses =>
  courses.sort((a, b) => {
    let timeA = a.getCurrentTimeEnd();
    let timeB = b.getCurrentTimeEnd();
    const currentTime = new Date();
    if (timeA > currentTime) timeA -= 999999;
    if (timeB > currentTime) timeB -= 999999;
    if (timeA > timeB) return 1;
    return -1;
  });

class List extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const { courses } = props;
    this.state = {
      courses: sortCourses(courses),
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
    if (this.props.courses !== nextProps.courses) {
      this.setState({ courses: sortCourses(nextProps.courses) });
    }
  }
  render() {
    const { addListCourseCalendar } = this.props;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.dispatch(backAction)} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Môn học</Title>
          </Body>
          <Right>
            <Button onPress={() => addListCourseCalendar(this.props.courses)} transparent>
              <Icon name="calendar" />
            </Button>
          </Right>
        </Header>
        <View padder style={{ flex: 1 }}>
          <FlatList
            ListEmptyComponent={<EmptyList />}
            data={this.state.courses}
            horizontal={false}
            keyExtractor={course =>
              course.getCode() + course.getDayOfWeek() + course.getLessonStart()
            }
            renderItem={({ item }) => (
              <ListItem
                course={item}
                navigation={this.props.navigation}
                numberNotifications={this.props.numberOfCourseNotificationsList[item.getCode()]}
                numberDeadlines={this.props.numberOfDeadlinesList[item.getCode()]}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.props.refreshing}
                onRefresh={() => this.props.onRefresh()}
                colors={ANDROID_PULL_TO_REFRESH_COLOR}
              />
            }
          />
        </View>
      </Container>
    );
  }
}

List.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
  error: '',
  numberOfCourseNotificationsList: {},
  numberOfDeadlinesList: {},
};

List.propTypes = {
  courses: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  numberOfCourseNotificationsList: PropTypes.object,
  numberOfDeadlinesList: PropTypes.object,
  refreshing: PropTypes.bool,
  setError: PropTypes.func.isRequired,
  error: PropTypes.string,
  onRefresh: PropTypes.func,
  addListCourseCalendar: PropTypes.func.isRequired,
};
export default List;
