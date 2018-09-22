import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Button, Icon, Badge, Left, Right, Body } from 'native-base';
import Navigator from '../../../Navigator/Action';

class Item extends React.Component {
  render() {
    const { studentPoint } = this.props;
    return (
      <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
        <CardItem>
          <Body>
            <Text style={{ paddingTop: 2 }}>{studentPoint.getTitle()}</Text>
          </Body>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }}>
          {studentPoint.getPoint() >= 0 ? (
            <Left>
              <Icon style={{ color: 'green' }} name="add-circle" />
              <Badge success>
                <Text>{studentPoint.getPoint()} điểm</Text>
              </Badge>
            </Left>
          ) : (
            <Left>
              <Icon style={{ color: 'red' }} name="add-circle" />
              <Badge danger>
                <Text>{studentPoint.getPoint()} điểm</Text>
              </Badge>
            </Left>
          )}
          <Body />
          <Right>
            <Button
              rounded
              small
              onPress={() => Navigator.navigate('WebBrowser', { link: studentPoint.getLink() })}
              primary
            >
              <Icon name="exit" />
              <Text>Xem</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
Item.propTypes = {
  studentPoint: PropTypes.object.isRequired,
};
export default Item;
