import React, { PropTypes } from 'react';
import { Card, CardItem, Icon, Text, Badge } from 'native-base';
import { STUDENT_POINT_RANK_NAME, STUDENT_POINT_RANK_COLOR } from '../../../../config/config';

class Final extends React.Component {
  render() {
    const rankColor = { [STUDENT_POINT_RANK_COLOR[this.props.finalRank]]: true };
    return (
      <Card>
        <CardItem>
          <Icon name="body" />
          <Text>Tổng điểm: </Text>
          <Badge info>
            <Text>{this.props.finalPoint}</Text>
          </Badge>
        </CardItem>
        <CardItem style={{ paddingTop: 2 }}>
          <Icon name="school" />
          <Text>Xếp loại: </Text>
          <Badge {...rankColor}>
            <Text>{STUDENT_POINT_RANK_NAME[this.props.finalRank]}</Text>
          </Badge>
        </CardItem>
      </Card>
    );
  }
}
Final.propTypes = {
  finalPoint: PropTypes.number.isRequired,
  finalRank: PropTypes.number.isRequired,
};
export default Final;
