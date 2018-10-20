import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Deadline from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

const sortDeadlines = deadlines =>
  // Sắp xếp theo thứ tự thời gian còn lại tăng dần.
  deadlines.sort((a, b) => {
    let timeA = a.getTime();
    let timeB = b.getTime();
    if (a.getStatus() !== 0) {
      timeA += 999999999999999;
    }
    if (b.getStatus() !== 0) {
      timeB += 999999999999999;
    }
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });
class List extends React.Component {
  constructor(props) {
    super(props);
    const { deadlines } = this.props;
    this.state = {
      deadlines: sortDeadlines(deadlines),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { deadlines } = nextProps;
    if (deadlines !== this.props.deadlines) {
      this.setState({ deadlines: sortDeadlines(deadlines) });
    }
  }
  render() {
    if (
      typeof this.props.onRefresh !== 'undefined' &&
      typeof this.props.refreshing !== 'undefined'
    ) {
      return (
        <FlatList
          ListEmptyComponent={<EmptyList />}
          data={this.state.deadlines}
          horizontal={false}
          keyExtractor={course => course.getId()}
          renderItem={({ item }) => <Deadline deadline={item} />}
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={() => this.props.onRefresh()}
              colors={ANDROID_PULL_TO_REFRESH_COLOR}
            />
          }
        />
      );
    }
    return (
      <View>
        {this.state.deadlines.map(item => <Deadline deadline={item} key={item.getId()} />)}
      </View>
    );
  }
}

List.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
};

List.propTypes = {
  deadlines: PropTypes.array.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};
export default List;
