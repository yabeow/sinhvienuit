import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Notification from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

class List extends React.Component {
  render() {
    if (
      typeof this.props.onRefresh !== 'undefined' &&
      typeof this.props.refreshing !== 'undefined'
    ) {
      return (
        <FlatList
          ListEmptyComponent={<EmptyList />}
          data={this.props.notifications}
          keyExtractor={item => item.getLink()}
          renderItem={({ item }) => <Notification notification={item} />}
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
        {this.props.notifications.map(item => (
          <Notification notification={item} key={item.getLink()} />
        ))}
      </View>
    );
  }
}

List.defaultProps = {
  refreshing: false,
  onRefresh: () => {},
};

List.propTypes = {
  notifications: PropTypes.array.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};
export default List;
