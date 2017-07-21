import React, { PropTypes } from 'react';
import { Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import ListNotifications from '../../../Notification/compoments/List';

class Details extends React.Component {
    render() {
        return (
            <Container>
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
                    <ListNotifications
                        notifications = { this.props.notifications.getCourseNotifications(this.props.course.getCode()) }
                    />
                </Content>
            </Container>
        )
    }
}
Details.propTypes = {
    course: PropTypes.object.isRequired
};
export default Details;