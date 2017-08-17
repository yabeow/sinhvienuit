import React, { PropTypes }  from 'react';
import { Linking } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Badge, Left, Right, Content } from 'native-base';

class Deadline extends React.Component {
    render() {
        return (
            <Card>
                <CardItem bordered>
                    <Text>{ this.props.deadline.getTitle() }</Text>
                </CardItem>
                <CardItem style={{ paddingTop: 2 }}>
                    <Icon name="time"/>
                    <Text>Hạn chót: { this.props.deadline.getTime('calendar') }</Text>
                </CardItem>
                <CardItem style={{ paddingTop: 2 }}>
                    <Left>
                        <Badge primary><Text>{ this.props.deadline.getCode() }</Text></Badge>
                        {
                            this.props.deadline.getStatus() === 1 ?
                                <Badge success><Text>Đã nộp</Text></Badge> :
                                this.props.deadline.getStatus() === 0 ?
                                    <Badge warning><Text>Chưa nộp</Text></Badge> :
                                    <Badge danger><Text>Đã hết hạn</Text></Badge>
                        }
                    </Left>
                    <Content/>
                    <Right>
                        <Button rounded small onPress={ () => Linking.openURL(this.props.deadline.getLink()) } success>
                            <Icon name="exit"/>
                            <Text>Xem</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}
Deadline.propsType = {
    deadline: PropTypes.object.isRequired
};
export default Deadline;
