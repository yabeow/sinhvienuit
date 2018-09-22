import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Text, Button, Icon, Badge, Left, Right, Content } from 'native-base';
import Navigator from '../../../Navigator/Action';

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
      <Card style={{ borderRadius: 8, overflow: 'hidden' }}>
        <CardItem>
          <Badge primary>
            <Text>{deadline.getCode()}</Text>
          </Badge>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }}>
          <Text style={{ flex: 1, flexWrap: 'wrap' }}>{deadline.getTitle()}</Text>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }} bordered>
          <Icon name="time" />
          <Text>Hạn chót: {deadline.getTime('calendar')}</Text>
        </CardItem>
        <CardItem style={{ paddingTop: 8 }}>
          <Left>{renderStatus(deadline.getStatus())}</Left>
          <Content />
          <Right>
            <Button
              rounded
              small
              onPress={() => Navigator.navigate('WebBrowser', { link: deadline.getLink() })}
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
