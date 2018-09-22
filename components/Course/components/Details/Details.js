import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Badge,
} from 'native-base';
import ListNotifications from '../../../Notification/components/List';
import ListDeadlines from '../../../Deadline/components/List';

class Details extends React.Component {
  render() {
    const { course, notifications, deadlines } = this.props;
    const notification = notifications.getCourseNotifications(course.getCode());
    const countNotification = notifications.getNumberOfCoursesNotifications(false, notification);
    const deadline = deadlines.getDeadlines(course.getCode());
    const countDeadline = deadlines.getNumberOfDeadlines(false, deadline);
    return (
      <Container>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                <Badge style={{ alignSelf: 'center', marginLeft: 10 }} info>
                  <Text>{countNotification}</Text>
                </Badge>
                <Text>Thông báo</Text>
              </TabHeading>
            }
          >
            <Content padder>
              <ListNotifications notifications={notification} />
            </Content>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Badge style={{ alignSelf: 'center', marginLeft: 10 }} danger>
                  <Text>{countDeadline}</Text>
                </Badge>
                <Text>Deadline</Text>
              </TabHeading>
            }
          >
            <Content padder>
              <ListDeadlines deadlines={deadline} />
            </Content>
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="information-circle" />
                <Text>Thông tin</Text>
              </TabHeading>
            }
          >
            <Content padder>
              <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
                <CardItem>
                  <Icon name="code" />
                  <Text>Mã lớp: {course.getCode()}</Text>
                </CardItem>
                <CardItem>
                  <Icon name="home" />
                  <Text>Phòng học: {course.getRoom()}</Text>
                </CardItem>
                <CardItem>
                  <Icon name="contact" />
                  <Text>Giảng viên: {course.getTeacher()}</Text>
                </CardItem>
                <CardItem>
                  <Icon name="time" />
                  <Text>
                    Thời gian: Thứ {course.getDayOfWeek()} từ {course.getLessonStart('LT')} -{' '}
                    {course.getLessonEnd('LT')}
                  </Text>
                </CardItem>
                <CardItem>
                  <Icon name="calendar" />
                  <Text>Bắt đầu: {course.getStartTime('LL')}</Text>
                </CardItem>
                <CardItem>
                  <Icon name="calendar" />
                  <Text>Kết thúc: {course.getEndTime('LL')}</Text>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
Details.propTypes = {
  course: PropTypes.object.isRequired,
  notifications: PropTypes.object.isRequired,
  deadlines: PropTypes.object.isRequired,
};
export default Details;
