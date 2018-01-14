import React, { PropTypes } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Exam from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

class List extends React.Component {
  render() {
    let { exams } = this.props;
    // Sắp xếp theo thứ tự thời gian còn lại tăng dần.
    const currentTime = new Date().getTime();
    exams = exams.sort((a, b) => {
      let timeA = a.getTime().getTime();
      let timeB = b.getTime().getTime();
      if (timeA > currentTime) timeA -= 9999999999;
      if (timeB > currentTime) timeB -= 9999999999;
      if (timeA < timeB) return -1;
      if (timeA > timeB) return 1;
      return 0;
    });
    if (
      typeof this.props.onRefresh !== 'undefined' &&
      typeof this.props.refreshing !== 'undefined'
    ) {
      return (
        <FlatList
          ListEmptyComponent={<EmptyList />}
          data={exams}
          horizontal={false}
          keyExtractor={item => item.getCode() + item.getTime()}
          renderItem={({ item }) => <Exam exam={item} />}
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
      <View>{exams.map(item => <Exam exam={item} key={item.getCode() + item.getTime()} />)}</View>
    );
  }
}
List.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
};
List.propTypes = {
  exams: PropTypes.array.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};
export default List;
