import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Badge, Left, Right, Body } from 'native-base';

const renderSource = (source) => {
  if (source === 'DAA') {
    return (
      <Badge primary>
        <Text>DAA</Text>
      </Badge>
    );
  } else if (source === 'OEP') {
    return (
      <Badge info>
        <Text>OEP</Text>
      </Badge>
    );
  }
  return (
    <Badge success>
      <Text>ORTHER</Text>
    </Badge>
  );
};

const renderType = (type) => {
  if (type === 1) {
    return (
      <Badge warning>
        <Text>Học bù</Text>
      </Badge>
    );
  } else if (type === 2) {
    return (
      <Badge success>
        <Text>Nghỉ học</Text>
      </Badge>
    );
  }
  return (
    <Badge dark>
      <Text>Chuyển phòng</Text>
    </Badge>
  );
};

class Item extends React.Component {
  render() {
    const { notification } = this.props;
    return (
      <Card>
        <CardItem>
          <Body>
            <Text style={{ paddingTop: 10 }}>{notification.getTitle()}</Text>
            <Text note> {notification.getCreateTime('L')} </Text>
          </Body>
        </CardItem>
        {!!notification.code && (
          <CardItem style={{ paddingTop: 2 }}>
            <Icon name="home" />
            <Text>Phòng học: {notification.getRoom()}</Text>
          </CardItem>
        )}
        {!!notification.code && (
          <CardItem style={{ paddingTop: 2 }}>
            <Icon name="time" />
            <Text>
              Thời gian: {notification.getStartTime('LT')} - {notification.getEndTime('LT')}
            </Text>
          </CardItem>
        )}
        <CardItem style={{ paddingTop: 2 }}>
          <Left>
            {renderSource(this.props.notification.getSource())}
            {!!notification.code && renderType(notification.getType())}
          </Left>
          <Body />
          <Right>
            <Button
              rounded
              small
              onPress={() => Linking.openURL(this.props.notification.getLink())}
              success
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
  notification: PropTypes.object.isRequired,
};
export default Item;
