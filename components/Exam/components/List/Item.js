import React, { PropTypes } from 'react';
import { Card, CardItem, Text, Icon, Badge } from 'native-base';

class Exam extends React.Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Text>{this.props.exam.getCode()}</Text>
        </CardItem>
        <CardItem>
          <Icon name="calendar" />
          <Text>
            Bằt đầu từ: {this.props.exam.getTime('LT')} ngày {this.props.exam.getTime('DD/MM')}
          </Text>
        </CardItem>
        <CardItem>
          <Icon name="home" />
          <Text>Phòng thi: {this.props.exam.getRoom()}</Text>
        </CardItem>
        <CardItem>
          <Badge primary>
            <Text>{this.props.exam.getCode()}</Text>
          </Badge>
          {this.props.exam.getTime() < new Date() ? (
            <Badge success>
              <Text>Đã thi</Text>
            </Badge>
          ) : (
            <Badge warning>
              <Text>Chưa thi</Text>
            </Badge>
          )}
        </CardItem>
      </Card>
    );
  }
}
Exam.propTypes = {
  exam: PropTypes.object.isRequired,
};
export default Exam;
