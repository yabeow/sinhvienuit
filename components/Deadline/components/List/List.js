import React, { PropTypes } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'native-base';
import Deadline from './Item';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

class List extends React.Component {
    render() {
        let deadlines = this.props.deadlines;
        //Sắp xếp theo thứ tự thời gian còn lại tăng dần.
        deadlines.sort(function(a, b) {
            let timeA, timeB;
            timeA = a.getTime();
            timeB = b.getTime();
            if (a.getStatus() === 0) {
                timeA -= 999999;
            }
            if (b.getStatus() === 0) {
                timeB -= 999999;
            }
            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;
            return 0;
        });
        if ((typeof this.props.onRefresh !== 'undefined') && (typeof this.props.refreshing !== 'undefined')) {
            return (
                <FlatList
                    ListEmptyComponent = { <EmptyList/> }
                    data={ this.props.deadlines }
                    horizontal={ false }
                    keyExtractor={ course => course.getId() }
                    renderItem={ ({item}) =>
                        <Deadline deadline={ item }/>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={ this.props.refreshing }
                            onRefresh={ () => this.props.onRefresh() }
                            colors={ ANDROID_PULL_TO_REFRESH_COLOR }
                        />
                    }
                />
            )
        }
        else {
            return (
                <View>
                    {
                        this.props.deadlines.map(function (item) {
                            return <Deadline deadline = { item } key={ item.getId() }/>
                        })
                    }
                </View>
            );
        }
    }
}
List.propsType = {
    deadlines: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;