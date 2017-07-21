import React, { PropTypes } from 'react';
import { CardItem, Right, Text, Card, Icon } from 'native-base';

class Item extends React.Component {
    render() {
        return (
            <Card>
                <CardItem
                    button
                    onPress={
                        () => this.props.navigation.navigate('CourseDetails', { course: this.props.course })
                    }
                >
                    <Text>{ this.props.course.getName() }</Text>
                    <Right>
                        <Icon name="arrow-forward"/>
                    </Right>
                </CardItem>
                <CardItem style={{paddingTop: 2}}>
                    <Icon name="time"/>
                    <Text>
                        Giờ học: {
                        this.props.course.getLessonStart('LT')
                        + " - " + this.props.course.getLessonEnd('LT')
                        + ' ngày '
                        + this.props.course.getCurrentTimeEnd('DD/MM')
                    }
                    </Text>
                </CardItem>
                <CardItem style={{paddingTop: 2}}>
                    <Icon name="home"/>
                    <Text>Phòng học: { this.props.course.getRoom() }</Text>
                </CardItem>
            </Card>
        )
    }
}
Item.propTypes = {
    course: PropTypes.object.isRequired
};
export default Item;