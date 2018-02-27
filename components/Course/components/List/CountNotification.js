import React from 'react';
import PropTypes from 'prop-types';
import { CardItem, Left, Badge, Right, Text } from 'native-base';

class CountNotification extends React.Component {
  render() {
    if (this.props.numberNotifications || this.props.numberDeadlines) {
      return (
        <CardItem style={{ paddingTop: 2 }}>
          {!!this.props.numberNotifications && (
            <Left>
              <Badge info>
                <Text>{this.props.numberNotifications} thông báo</Text>
              </Badge>
            </Left>
          )}
          {!!this.props.numberDeadlines && (
            <Badge warning>
              <Text>{this.props.numberDeadlines} deadline</Text>
            </Badge>
          )}
          <Right />
        </CardItem>
      );
    }
    return null;
  }
}

CountNotification.defaultProps = {
  numberNotifications: 0,
  numberDeadlines: 0,
};

CountNotification.propTypes = {
  numberNotifications: PropTypes.number,
  numberDeadlines: PropTypes.number,
};
export default CountNotification;
