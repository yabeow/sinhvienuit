import React, { PropTypes } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Tabs, Tab, TabHeading, Badge } from 'native-base';
import ListNotifications from '../../../Notification/components/List';
import ListDeadlines from '../../../Deadline/components/List';

class Details extends React.Component {
    render() {
        let notifications = this.props.notifications.getCourseNotifications(this.props.course.getCode());
        let countNotifications = this.props.notifications.getNumberOfCoursesNotifications(false, notifications);
        let deadlines = this.props.deadlines.getDeadlines(this.props.course.getCode());
        let countDeadlines = this.props.deadlines.getNumberOfDeadlines(false, deadlines);
        return (
            <Container>
                <Tabs>
                    <Tab heading = {
                        <TabHeading>
                            <Badge style={{ alignSelf: 'center', marginLeft: 10 }} info><Text>{ countNotifications }</Text></Badge>
                            <Text>Thông báo</Text>
                        </TabHeading>
                    }>
                        <Content padder>
                            <ListNotifications
                                notifications = { notifications }
                            />
                        </Content>
                    </Tab>
                    <Tab heading = {
                        <TabHeading>
                            <Badge style={{ alignSelf: 'center', marginLeft: 10 }} danger><Text>{ countDeadlines }</Text></Badge>
                            <Text>Deadline</Text>
                        </TabHeading>
                    }>
                        <Content padder>
                            <ListDeadlines
                                deadlines = { deadlines }
                            />
                        </Content>
                    </Tab>
                    <Tab heading={
                        <TabHeading>
                            <Icon name="information-circle" />
                            <Text>Thông tin</Text>
                        </TabHeading>
                    }>
                        <Content padder>
                            <Card>
                                <CardItem>
                                    <Icon name="code"/>
                                    <Text>
                                        Mã lớp: { this.props.course.getCode() }
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Icon name="home"/>
                                    <Text>
                                        Phòng học: { this.props.course.getRoom() }
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Icon name="contact"/>
                                    <Text>
                                        Giảng viên: { this.props.course.getTeacher() }
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Icon name="time"/>
                                    <Text>
                                        Thời gian: Thứ { this.props.course.getDayOfWeek() } từ { this.props.course.getLessonStart('LT') } - { this.props.course.getLessonEnd('LT') }
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Icon name="calendar"/>
                                    <Text>
                                        Bắt đầu: { this.props.course.getStartTime('LL') }
                                    </Text>
                                </CardItem>
                                <CardItem>
                                    <Icon name="calendar"/>
                                    <Text>
                                        Kết thúc: { this.props.course.getEndTime('LL') }
                                    </Text>
                                </CardItem>
                            </Card>
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
Details.propTypes = {
    course: PropTypes.object.isRequired
};
export default Details;