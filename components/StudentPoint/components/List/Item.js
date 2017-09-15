import React, { PropTypes } from 'react';
import { Linking } from 'react-native';
import { View, Card, CardItem, Text, Button, Icon, Badge, Left, Right, Body } from 'native-base';

class Item extends React.Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Body>
                        <Text style = {{ paddingTop: 2 }}>{ this.props.studentPoint.getTitle() }</Text>
                    </Body>
                </CardItem>
                <CardItem style = {{ paddingTop: 2 }}>
                    {
                        (this.props.studentPoint.getPoint() >= 0) ?
                            <Left>
                                <Icon style = {{color: 'green'}} name = "add-circle"/>
                                <Badge success><Text>{ this.props.studentPoint.getPoint() } điểm</Text></Badge>
                            </Left>
                            :
                            <Left>
                                <Icon style = {{color: 'red'}} name = "add-circle"/>
                                <Badge danger><Text>{ this.props.studentPoint.getPoint() } điểm</Text></Badge>
                            </Left>
                    }
                    <Body/>
                    <Right>
                        <Button
                            small
                            onPress={ () => Linking.openURL(this.props.studentPoint.getLink()) }
                            primary
                        >
                            <Icon name="exit"/>
                            <Text>Xem</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}
Item.propTypes = {
    studentPoint: PropTypes.object.isRequired
};
export default Item;