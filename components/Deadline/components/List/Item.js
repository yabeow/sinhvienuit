import React, { PropTypes } from 'react';
import { Linking } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Badge, Left, Right, Content } from 'native-base';

const renderStatus = (status) => {
  if (status === 1) {
    return (
      <Badge success>
        <Text>Đã nộp</Text>
      </Badge>
    );
  } else if (status === 0) {
    return (
      <Badge warning>
        <Text>Chưa nộp</Text>
      </Badge>
    );
  }
  return (
    <Badge danger>
      <Text>Đã hết hạn</Text>
    </Badge>
  );
};

class Deadline extends React.Component {
  render() {
    const { deadline } = this.props;
    return (
      <Card>
        <CardItem bordered>
          <Text>{deadline.getTitle()}</Text>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }}>
          <Icon name="time" />
          <Text>Hạn chót: {deadline.getTime('calendar')}</Text>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }}>
          <Left>
            <Badge primary>
              <Text>{deadline.getCode()}</Text>
            </Badge>
            {renderStatus(deadline.getStatus())}
          </Left>
          <Content />
          <Right>
            <Button
              rounded
              small
              onPress={() => Linking.openURL(this.props.deadline.getLink())}
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

Deadline.propTypes = {
  deadline: PropTypes.object.isRequired,
};

export default Deadline;
