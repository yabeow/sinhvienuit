import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Exam from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

const sortExams = (exams) => {
  // Sắp xếp theo thứ tự thời gian còn lại tăng dần.
  const currentTime = new Date().getTime();
  return exams.sort((a, b) => {
    let timeA = a.getTime().getTime();
    let timeB = b.getTime().getTime();
    if (timeA > currentTime) timeA -= 9999999999;
    if (timeB > currentTime) timeB -= 9999999999;
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });
};

class List extends React.Component {
  constructor(props) {
    super(props);
    const { exams } = this.props;
    this.state = {
      exams: sortExams(exams),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { exams } = nextProps;
    if (exams !== this.props.exams) {
      this.setState({ exams: sortExams(exams) });
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
          data={this.state.exams}
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
      <View>
        {this.state.exams.map(item => <Exam exam={item} key={item.getCode() + item.getTime()} />)}
      </View>
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
